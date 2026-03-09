import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUiStore = create(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
      activeModal: null,
      setActiveModal: (modal) => set({ activeModal: modal }),
      closeModal: () => set({ activeModal: null }),
    }),
    {
      name: "bestay-ui",
      partialize: (state) => ({ language: state.language }),
    },
  ),
);
