import { baserowApi } from '../baserow/api';
import { DatabaseError } from './errors';
import { RelationshipRecord, UserRecord } from './types';
import { validateRecord, sanitizeData } from './utils';

class Database {
  private static instance: Database;
  
  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async getRelationship(userId: string): Promise<RelationshipRecord | null> {
    try {
      return await baserowApi.getRelationship(userId);
    } catch (error) {
      throw new DatabaseError('Failed to fetch relationship', error);
    }
  }

  async createRelationship(data: Partial<RelationshipRecord>): Promise<RelationshipRecord> {
    try {
      validateRecord(data, 'relationship');
      const sanitizedData = sanitizeData(data);
      return await baserowApi.createRelationship(sanitizedData);
    } catch (error) {
      throw new DatabaseError('Failed to create relationship', error);
    }
  }

  async updateRelationship(id: string, data: Partial<RelationshipRecord>): Promise<RelationshipRecord> {
    try {
      const sanitizedData = sanitizeData(data);
      return await baserowApi.updateRelationship(id, sanitizedData);
    } catch (error) {
      throw new DatabaseError('Failed to update relationship', error);
    }
  }

  async getUser(firebaseId: string): Promise<UserRecord | null> {
    try {
      return await baserowApi.getUser(firebaseId);
    } catch (error) {
      throw new DatabaseError('Failed to fetch user', error);
    }
  }

  async createUser(data: Partial<UserRecord>): Promise<UserRecord> {
    try {
      validateRecord(data, 'user');
      const sanitizedData = sanitizeData(data);
      return await baserowApi.createUser(sanitizedData);
    } catch (error) {
      throw new DatabaseError('Failed to create user', error);
    }
  }

  async updateUser(id: string, data: Partial<UserRecord>): Promise<UserRecord> {
    try {
      const sanitizedData = sanitizeData(data);
      return await baserowApi.updateUser(id, sanitizedData);
    } catch (error) {
      throw new DatabaseError('Failed to update user', error);
    }
  }
}

export const db = Database.getInstance();