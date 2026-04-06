import { useState } from "react";
import { PenTool, ExternalLink } from "lucide-react";

interface NavbarProps {
  currentPage: "home" | "generator" | "saved";
  setPage: (page: "home" | "generator" | "saved") => void;
}

export function Navbar({ currentPage, setPage }: NavbarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setPage("home")}
        >
          {!imgError ? (
            <img 
              src="https://lh3.googleusercontent.com/u/0/d/15Huh_FdB4k-q2M77Co0_x1r9X92TVEnz" 
              alt="AuraChallenge Logo" 
              className="h-8 w-8 object-contain" 
              onError={() => setImgError(true)} 
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
              <PenTool size={18} />
            </div>
          )}
          <span className="font-display text-xl font-bold tracking-tight text-gray-900">
            AuraChallenge
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage("home")}
            className={`text-sm font-medium transition-colors hover:text-gray-900 ${
              currentPage === "home" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setPage("saved")}
            className={`text-sm font-medium transition-colors hover:text-gray-900 ${
              currentPage === "saved" ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Mis Retos
          </button>
          <button
            onClick={() => setPage("generator")}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md active:scale-95"
          >
            Challenge Generator
          </button>
          <a
            href="https://aura-nook.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"
          >
            Crear en AuraNook
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
