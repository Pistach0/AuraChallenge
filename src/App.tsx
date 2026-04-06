/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Landing } from "./components/Landing";
import { Generator } from "./components/Generator";
import { SavedChallenges } from "./components/SavedChallenges";

export type Page = "home" | "generator" | "saved";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-200">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main>
        {currentPage === "home" && <Landing onStart={() => setCurrentPage("generator")} />}
        {currentPage === "generator" && <Generator />}
        {currentPage === "saved" && <SavedChallenges />}
      </main>
    </div>
  );
}
