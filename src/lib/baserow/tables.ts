import { TABLES, FIELDS, FIELD_TYPES } from './schema';
import { baserowApi } from '../baserow';

export async function createTables() {
  try {
    for (const tableName of Object.values(TABLES)) {
      const fields = FIELD_TYPES[tableName];
      
      // Create table
      const { data: table } = await baserowApi.post('/database/tables/', {
        name: tableName,
      });

      // Create fields
      for (const field of fields) {
        await baserowApi.post(`/database/fields/table/${table.id}/`, {
          ...field,
          table_id: table.id,
        });
      }
    }

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Failed to create tables');
  }
}