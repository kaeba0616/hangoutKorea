import { create } from 'zustand';
import { FOLLOWING_IDS } from '@/mocks/users';

type FollowsState = {
  following: Set<string>;
  removed: Set<string>;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  isFollowing: (id: string) => boolean;
  isRemoved: (id: string) => boolean;
};

export const useFollowsStore = create<FollowsState>((set, get) => ({
  following: new Set(FOLLOWING_IDS),
  removed: new Set<string>(),
  toggle: (id) =>
    set((state) => {
      const next = new Set(state.following);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { following: next };
    }),
  remove: (id) =>
    set((state) => {
      const nextFollowing = new Set(state.following);
      nextFollowing.delete(id);
      const nextRemoved = new Set(state.removed);
      nextRemoved.add(id);
      return { following: nextFollowing, removed: nextRemoved };
    }),
  isFollowing: (id) => get().following.has(id),
  isRemoved: (id) => get().removed.has(id),
}));
