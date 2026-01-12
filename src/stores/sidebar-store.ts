import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SidebarState = {
  minify: boolean;
  toggle: () => void;
  setMinify: (value: boolean) => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    set => ({
      minify: false,

      toggle: () =>
        set(state => ({
          minify: !state.minify,
        })),

      setMinify: value =>
        set({
          minify: value,
        }),
    }),
    {
      name: 'sidebar-state',
      version: 1,
    }
  )
);
