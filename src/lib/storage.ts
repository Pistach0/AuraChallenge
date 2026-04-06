import { Challenge, Difficulty } from "./gemini";

export interface SavedChallenge extends Challenge {
  id: string;
  difficulty: Difficulty;
  savedAt: number;
  completed: boolean;
}

const STORAGE_KEY = "aurachallenge_saved";

export function getSavedChallenges(): SavedChallenge[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveChallenge(challenge: Challenge, difficulty: Difficulty): SavedChallenge {
  const saved = getSavedChallenges();
  const newChallenge: SavedChallenge = {
    ...challenge,
    id: crypto.randomUUID(),
    difficulty,
    savedAt: Date.now(),
    completed: false,
  };
  saved.push(newChallenge);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  return newChallenge;
}

export function deleteChallenge(id: string) {
  const saved = getSavedChallenges();
  const filtered = saved.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function toggleChallengeCompletion(id: string) {
  const saved = getSavedChallenges();
  const updated = saved.map(c => c.id === id ? { ...c, completed: !c.completed } : c);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
