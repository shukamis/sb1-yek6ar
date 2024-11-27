import { baserowClient } from './client';
import { BASEROW_CONFIG } from './config';
import { RelationshipRecord, UserRecord } from '../database/types';
import { handleApiError } from './utils';

export const baserowApi = {
  async getRelationship(userId: string): Promise<RelationshipRecord | null> {
    try {
      const response = await baserowClient.get(
        `/database/rows/table/${BASEROW_CONFIG.TABLES.RELATIONSHIPS}/`,
        {
          params: {
            user_field_names: true,
            filter__user_id__equal: userId,
          },
        }
      );
      return response.data.results[0] || null;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch relationship');
    }
  },

  async createRelationship(data: Partial<RelationshipRecord>): Promise<RelationshipRecord> {
    try {
      const response = await baserowClient.post(
        `/database/rows/table/${BASEROW_CONFIG.TABLES.RELATIONSHIPS}/`,
        {
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { params: { user_field_names: true } }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to create relationship');
    }
  },

  async updateRelationship(id: string, data: Partial<RelationshipRecord>): Promise<RelationshipRecord> {
    try {
      const response = await baserowClient.patch(
        `/database/rows/table/${BASEROW_CONFIG.TABLES.RELATIONSHIPS}/${id}/`,
        {
          ...data,
          updated_at: new Date().toISOString(),
        },
        { params: { user_field_names: true } }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update relationship');
    }
  },

  async getUser(firebaseId: string): Promise<UserRecord | null> {
    try {
      const response = await baserowClient.get(
        `/database/rows/table/${BASEROW_CONFIG.TABLES.USERS}/`,
        {
          params: {
            user_field_names: true,
            filter__firebase_id__equal: firebaseId,
          },
        }
      );
      return response.data.results[0] || null;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch user');
    }
  },

  async createUser(data: Partial<UserRecord>): Promise<UserRecord> {
    try {
      const response = await baserowClient.post(
        `/database/rows/table/${BASEROW_CONFIG.TABLES.USERS}/`,
        {
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { params: { user_field_names: true } }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to create user');
    }
  },

  async updateUser(id: string, data: Partial<UserRecord>): Promise<UserRecord> {
    try {
      const response = await baserowClient.patch(
        `/database/rows/table/${BASEROW_CONFIG.TABLES.USERS}/${id}/`,
        {
          ...data,
          updated_at: new Date().toISOString(),
        },
        { params: { user_field_names: true } }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update user');
    }
  },
};