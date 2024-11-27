import { Relationship } from '../types';

const RELATIONSHIP_KEY = 'love_tracker_relationship';

interface CreateRelationshipParams {
  partner1Name: string;
  partner2Name: string;
}

export async function createRelationship(
  userId: string, 
  startDate: string,
  params: CreateRelationshipParams
): Promise<Relationship> {
  const relationship: Relationship = {
    id: Date.now().toString(),
    userId,
    partnerId: null,
    startDate,
    photos: [],
    monthlyReminder: true,
    lastChecked: new Date().toISOString(),
    partner1Name: params.partner1Name,
    partner2Name: params.partner2Name
  };

  localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(relationship));
  return relationship;
}

export async function getRelationship(userId: string): Promise<Relationship | null> {
  const stored = localStorage.getItem(RELATIONSHIP_KEY);
  if (!stored) return null;

  const relationship = JSON.parse(stored) as Relationship;
  return relationship.userId === userId ? relationship : null;
}

export async function updateRelationship(
  relationshipId: string,
  updates: Partial<{
    startDate: string;
    photos: string[];
    monthlyReminder: boolean;
    partnerId: string | null;
    partner1Name: string;
    partner2Name: string;
  }>
): Promise<Relationship> {
  const stored = localStorage.getItem(RELATIONSHIP_KEY);
  if (!stored) throw new Error('Relationship not found');

  const relationship = JSON.parse(stored) as Relationship;
  if (relationship.id !== relationshipId) throw new Error('Relationship not found');

  const updated = {
    ...relationship,
    ...updates,
  };

  localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(updated));
  return updated;
}