import { create } from 'zustand';

interface PremiumState {
  showPremiumModal: boolean;
  setShowPremiumModal: (show: boolean) => void;
}

export const usePremiumStore = create<PremiumState>((set) => ({
  showPremiumModal: false,
  setShowPremiumModal: (show) => set({ showPremiumModal: show }),
}));