import api from '@/services/api/config/axios';
import API_ENDPOINTS from '@/services/api/config/endpoints';
import { Plato, CreatePlatoRequest, UpdatePlatoRequest } from '@/services/api/types';

export const platoService = {
  getAll: async (): Promise<Plato[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.platos.list);
      return response.data;
    } catch (error) {
      console.error('Error fetching platos:', error);
      throw error;
    }
  },

  getAllActive: async (): Promise<Plato[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.platos.listActive);
      return response.data;
    } catch (error) {
      console.error('Error fetching active platos:', error);
      throw error;
    }
  },

  getByCodigo: async (codigo: string): Promise<Plato> => {
    try {
      const response = await api.get(API_ENDPOINTS.platos.detail(codigo));
      return response.data;
    } catch (error) {
      console.error(`Error fetching plato with codigo ${codigo}:`, error);
      throw error;
    }
  },

  create: async (plato: CreatePlatoRequest): Promise<Plato> => {
    try {
      const response = await api.post(API_ENDPOINTS.platos.create, plato);
      return response.data;
    } catch (error) {
      console.error('Error creating plato:', error);
      throw error;
    }
  },

  update: async (codigo: string, plato: UpdatePlatoRequest): Promise<Plato> => {
    try {
      const response = await api.put(API_ENDPOINTS.platos.update(codigo), plato);
      return response.data;
    } catch (error) {
      console.error(`Error updating plato with codigo ${codigo}:`, error);
      throw error;
    }
  },

  delete: async (codigo: string): Promise<void> => {
    try {
      await api.delete(API_ENDPOINTS.platos.delete(codigo));
    } catch (error) {
      console.error(`Error deleting plato with codigo ${codigo}:`, error);
      throw error;
    }
  },

  search: async (query: string): Promise<Plato[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.platos.search, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching platos:', error);
      throw error;
    }
  }
}; 