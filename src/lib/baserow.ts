import axios from 'axios';

const BASEROW_API_URL = import.meta.env.VITE_BASEROW_API_URL;
const BASEROW_TOKEN = import.meta.env.VITE_BASEROW_TOKEN;

const baserowApi = axios.create({
  baseURL: BASEROW_API_URL,
  headers: {
    Authorization: `Token ${BASEROW_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

interface BaserowTable {
  id: string;
  name: string;
}

interface BaserowRecord {
  id: number;
  [key: string]: any;
}

export async function getTable(tableId: string): Promise<BaserowRecord[]> {
  try {
    const response = await baserowApi.get(`/database/rows/table/${tableId}/`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Baserow table:', error);
    throw new Error('Failed to fetch table data');
  }
}

export async function createRecord(tableId: string, data: any): Promise<BaserowRecord> {
  try {
    const response = await baserowApi.post(`/database/rows/table/${tableId}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Baserow record:', error);
    throw new Error('Failed to create record');
  }
}

export async function updateRecord(tableId: string, recordId: number, data: any): Promise<BaserowRecord> {
  try {
    const response = await baserowApi.patch(`/database/rows/table/${tableId}/${recordId}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Baserow record:', error);
    throw new Error('Failed to update record');
  }
}

export async function deleteRecord(tableId: string, recordId: number): Promise<void> {
  try {
    await baserowApi.delete(`/database/rows/table/${tableId}/${recordId}/`);
  } catch (error) {
    console.error('Error deleting Baserow record:', error);
    throw new Error('Failed to delete record');
  }
}