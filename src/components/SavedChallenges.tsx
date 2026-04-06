import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { getSavedChallenges, deleteChallenge, toggleChallengeCompletion, type SavedChallenge } from "../lib/storage";
import { 
  Trash2, 
  CheckCircle, 
  Circle, 
  Map, 
  Users, 
  Home, 
  Ruler, 
  Building, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

export function SavedChallenges() {
  const [challenges, setChallenges] = useState<SavedChallenge[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setChallenges(getSavedChallenges());
  }, []);

  const handleDelete = (id: string) => {
    deleteChallenge(id);
    setChallenges(getSavedChallenges());
  };

  const handleToggle = (id: string) => {
    toggleChallengeCompletion(id);
    setChallenges(getSavedChallenges());
  };

  if (challenges.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-gray-900">Aún no tienes retos guardados</h2>
        <p className="mt-4 text-gray-600">Ve al generador para crear y guardar tus primeros desafíos arquitectónicos.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-8 font-display text-4xl font-bold tracking-tight text-gray-900">Mis Retos Guardados</h2>
      <div className="space-y-6">
        {challenges.map((challenge) => (
          <motion.div 
            key={challenge.id} 
            layout 
            className={`overflow-hidden rounded-3xl border ${
              challenge.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200 bg-white'
            } shadow-sm transition-colors`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleToggle(challenge.id)} 
                  className={`transition-colors ${
                    challenge.completed ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={challenge.completed ? "Marcar como pendiente" : "Marcar como completado"}
                >
                  {challenge.completed ? <CheckCircle size={28} /> : <Circle size={28} />}
                </button>
                <div>
                  <h3 className={`font-display text-xl font-bold ${
                    challenge.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {challenge.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Dificultad: {challenge.difficulty} • Guardado el {new Date(challenge.savedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setExpandedId(expandedId === challenge.id ? null : challenge.id)} 
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                  title="Ver detalles"
                >
                  {expandedId === challenge.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <button 
                  onClick={() => handleDelete(challenge.id)} 
                  className="rounded-full p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Eliminar reto"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === challenge.id && (
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white">
                {/* Columna Izquierda: Contexto */}
                <div className="p-6 md:col-span-2 space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
                      <Users size={20} className="text-gray-400" />
                      Perfil del Cliente
                    </h4>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {challenge.clientProfile}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
                      <Map size={20} className="text-gray-400" />
                      Entorno y Contexto
                    </h4>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {challenge.environment}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
                      <AlertCircle size={20} className="text-gray-400" />
                      Restricciones Específicas
                    </h4>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {challenge.specificConstraints}
                    </p>
                  </div>
                </div>

                {/* Columna Derecha: Parámetros Técnicos */}
                <div className="bg-gray-50 p-6">
                  <h4 className="font-display text-lg font-semibold text-gray-900 mb-4">
                    Ficha Técnica
                  </h4>
                  
                  <dl className="space-y-4">
                    <div>
                      <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Home size={16} /> Tipología
                      </dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">
                        Vivienda {challenge.technicalParameters.typology}
                      </dd>
                    </div>

                    <div>
                      <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Ruler size={16} /> Dimensiones del Terreno
                      </dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">
                        {challenge.technicalParameters.plotWidth}m × {challenge.technicalParameters.plotLength}m
                        <span className="ml-2 text-sm text-gray-500 font-normal">
                          ({challenge.technicalParameters.plotWidth * challenge.technicalParameters.plotLength} m²)
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <Building size={16} /> Programa
                      </dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">
                        Max. {challenge.technicalParameters.maxArea} m² construidos<br/>
                        {challenge.technicalParameters.inhabitants} habitantes · Mín. {challenge.technicalParameters.minRooms} habitaciones
                      </dd>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Normativa Urbanística</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between">
                          <span>Ocupación Máxima:</span>
                          <span className="font-medium text-gray-900">{challenge.urbanRequirements.maxOccupation}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Plantas Máximas:</span>
                          <span className="font-medium text-gray-900">{challenge.urbanRequirements.maxFloors}</span>
                        </li>
                        <li className="flex flex-col gap-1">
                          <span>Distancia a lindes:</span>
                          <span className="font-medium text-gray-900">{challenge.urbanRequirements.distanceToBoundaries}</span>
                        </li>
                      </ul>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
