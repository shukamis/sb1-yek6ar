import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  category: 'relationship' | 'games' | 'memories' | 'tools';
  isUnlocked: boolean;
}

interface PremiumFeaturesState {
  features: PremiumFeature[];
  recentlyViewed: string[];
  addRecentlyViewed: (featureId: string) => void;
  unlockFeature: (featureId: string) => void;
}

export const usePremiumFeatures = create<PremiumFeaturesState>()(
  persist(
    (set) => ({
      features: [],
      recentlyViewed: [],
      addRecentlyViewed: (featureId) =>
        set((state) => ({
          recentlyViewed: [
            featureId,
            ...state.recentlyViewed.filter((id) => id !== featureId),
          ].slice(0, 5),
        })),
      unlockFeature: (featureId) =>
        set((state) => ({
          features: state.features.map((feature) =>
            feature.id === featureId ? { ...feature, isUnlocked: true } : feature
          ),
        })),
    }),
    {
      name: 'premium-features',
    }
  )
);