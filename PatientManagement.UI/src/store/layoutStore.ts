import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LayoutState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileDrawerOpen: boolean;
  setMobileDrawerOpen: (isOpen: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  immer((set) => ({
    isSidebarCollapsed: false,
    toggleSidebar: () =>
      set((state) => {
        state.isSidebarCollapsed = !state.isSidebarCollapsed;
      }),
    isMobileDrawerOpen: false,
    setMobileDrawerOpen: (isOpen) =>
      set((state) => {
        state.isMobileDrawerOpen = isOpen;
      }),
  }))
);
