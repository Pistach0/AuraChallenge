import { motion } from "motion/react";
import { ArrowRight, Compass, Layers, Lightbulb } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Inspira tus próximos <br />
          <span className="text-gray-400">proyectos de vivienda</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
          Generador de desafíos arquitectónicos impulsado por IA. Obtén perfiles de clientes, 
          restricciones urbanísticas y programas de necesidades para practicar y mejorar tus 
          habilidades de diseño.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={onStart}
            className="group flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95"
          >
            Comenzar un Reto
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3"
      >
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-900">
            <Lightbulb size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold text-gray-900">Generación Inteligente</h3>
          <p className="mt-2 text-gray-600">
            Desafíos únicos creados por IA con perfiles de clientes realistas y contextos específicos.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-900">
            <Layers size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold text-gray-900">Requisitos Detallados</h3>
          <p className="mt-2 text-gray-600">
            Parámetros técnicos precisos: superficies, tipologías, normativas y programas de necesidades.
          </p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-900">
            <Compass size={24} />
          </div>
          <h3 className="font-display text-xl font-semibold text-gray-900">Dificultad Adaptable</h3>
          <p className="mt-2 text-gray-600">
            Desde programas sencillos hasta terrenos complejos con normativas urbanísticas estrictas.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
