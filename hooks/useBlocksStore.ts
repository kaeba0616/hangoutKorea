import { create } from 'zustand';

type BlocksState = {
  blocked: Set<string>;
  toggle: (id: string) => void;
  isBlocked: (id: string) => boolean;
};

export const useBlocksStore = create<BlocksState>((set, get) => ({
  blocked: new Set<string>(),
  toggle: (id) =>
    set((state) => {
      const next = new Set(state.blocked);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { blocked: next };
    }),
  isBlocked: (id) => get().blocked.has(id),
}));
