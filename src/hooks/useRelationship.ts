import { create } from 'zustand';
import { Relationship } from '../types';

interface RelationshipState {
  relationship: Relationship | null;
  loading: boolean;
  error: Error | null;
  setRelationship: (relationship: Relationship | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useRelationship = create<RelationshipState>((set) => ({
  relationship: null,
  loading: true,
  error: null,
  setRelationship: (relationship) => set({ relationship }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));