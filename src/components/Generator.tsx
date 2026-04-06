import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { generateChallenge, type Difficulty, type Challenge } from "../lib/gemini";
import { saveChallenge } from "../lib/storage";
import { 
  Loader2, 
  Map, 
  Users, 
  Home, 
  Ruler, 
  Building, 
  AlertCircle,
  RefreshCw,
  Download,
  Bookmark,
  BookmarkCheck
} from "lucide-react";

export function Generator() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Medio");
  const [isGenerating, setIsGenerating] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setIsSaved(false);
    try {
      const result = await generateChallenge(difficulty);
      setChallenge(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar el desafío");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (challenge) {
      saveChallenge(challenge, difficulty);
      setIsSaved(true);
    }
  };

  const difficulties: { level: Difficulty; desc: string }[] = [
    { level: "Fácil", desc: "Programas sencillos en terrenos amplios." },
    { level: "Medio", desc: "Contextos urbanos estándar con restricciones moderadas." },
    { level: "Difícil", desc: "Terrenos complejos y programas densos con normativas estrictas." }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900">
          Configura tu Reto
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Selecciona el nivel de dificultad y deja que la IA genere un encargo arquitectónico único.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {difficulties.map((d) => (
          <button
            key={d.level}
            onClick={() => setDifficulty(d.level)}
            className={`relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all ${
              difficulty === d.level
                ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                : "border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="font-display text-xl font-semibold">{d.level}</span>
            <span className={`mt-2 text-sm leading-relaxed ${
              difficulty === d.level ? "text-gray-300" : "text-gray-500"
            }`}>
              {d.desc}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="group flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95 disabled:pointer-events-none disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generando encargo...
            </>
          ) : (
            <>
              <RefreshCw size={20} className="transition-transform group-hover:rotate-180" />
              Generar Desafío
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-8 rounded-2xl bg-red-50 p-4 text-red-800 flex items-center gap-3">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {challenge && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-16 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="border-b border-gray-200 bg-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800">
                  Nivel: {difficulty}
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isSaved ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    {isSaved ? "Guardado" : "Guardar Reto"}
                  </button>
                  <button 
                    className="rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    title="Descargar PDF (Próximamente)"
                  >
                    <Download size={20} />
                  </button>
                  <a
                    href="https://aura-nook.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"
                  >
                    Crear en AuraNook
                  </a>
                </div>
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold text-gray-900">
                {challenge.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Columna Izquierda: Contexto */}
              <div className="p-8 md:col-span-2 space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
                    <Users size={20} className="text-gray-400" />
                    Perfil del Cliente
                  </h4>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {challenge.clientProfile}
                  </p>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
                    <Map size={20} className="text-gray-400" />
                    Entorno y Contexto
                  </h4>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {challenge.environment}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-900">
                    <AlertCircle size={20} className="text-gray-400" />
                    Restricciones Específicas
                  </h4>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {challenge.specificConstraints}
                  </p>
                </div>
              </div>

              {/* Columna Derecha: Parámetros Técnicos */}
              <div className="bg-gray-50 p-8">
                <h4 className="font-display text-lg font-semibold text-gray-900 mb-6">
                  Ficha Técnica
                </h4>
                
                <dl className="space-y-6">
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

                  <div className="pt-6 border-t border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-900 mb-3">Normativa Urbanística</h5>
                    <ul className="space-y-3 text-sm text-gray-600">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
