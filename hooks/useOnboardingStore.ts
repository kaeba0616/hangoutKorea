import { create } from 'zustand';
import type { ProficiencyLevel } from '@/constants/languages';

export type Gender = 'male' | 'female' | 'other';

export type OnboardingState = {
  email: string | null;
  password: string | null;
  name: string;
  bio: string;
  age: number | null;
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
  gender: Gender | null;
  photoUri: string | null;
  nationality: string | null;
  languages: string[];
  proficiency: Record<string, ProficiencyLevel>;
};

type OnboardingActions = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setProfile: (profile: {
    name: string;
    bio: string;
    age: number | null;
    birthYear: number | null;
    birthMonth: number | null;
    birthDay: number | null;
    gender: Gender | null;
    photoUri: string | null;
  }) => void;
  setNationality: (code: string) => void;
  setLanguages: (codes: string[]) => void;
  setProficiency: (proficiency: Record<string, ProficiencyLevel>) => void;
  reset: () => void;
};

const initial: OnboardingState = {
  email: null,
  password: null,
  name: '',
  bio: '',
  age: null,
  birthYear: null,
  birthMonth: null,
  birthDay: null,
  gender: null,
  photoUri: null,
  nationality: null,
  languages: [],
  proficiency: {},
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>((set) => ({
  ...initial,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setProfile: (profile) => set(profile),
  setNationality: (nationality) => set({ nationality }),
  setLanguages: (languages) =>
    set((state) => {
      const next: Record<string, ProficiencyLevel> = {};
      for (const code of languages) {
        next[code] = state.proficiency[code] ?? 'beginner';
      }
      return { languages, proficiency: next };
    }),
  setProficiency: (proficiency) => set({ proficiency }),
  reset: () => set(initial),
}));
