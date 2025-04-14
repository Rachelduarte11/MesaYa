import { Distrito, CreateDistritoRequest, UpdateDistritoRequest } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';
import api from '../api/config/axios';

export const distritoService = {
  getAll: async (): Promise<Distrito[]> => {
    const response = await api.get(API_ENDPOINTS.distritos.list);
    return response.data;
  },

  getAllActive: async (): Promise<Distrito[]> => {
    const response = await api.get(API_ENDPOINTS.distritos.listActive);
    return response.data;
  },

  getByCodigo: async (codigo: string): Promise<Distrito> => {
    const response = await api.get(API_ENDPOINTS.distritos.detail(codigo));
    return response.data;
  },

  create: async (distrito: CreateDistritoRequest): Promise<Distrito> => {
    const response = await api.post(API_ENDPOINTS.distritos.create, distrito);
    return response.data;
  },

  update: async (codigo: string, distrito: UpdateDistritoRequest): Promise<Distrito> => {
    const response = await api.put(API_ENDPOINTS.distritos.update(codigo), distrito);
    return response.data;
  },

  delete: async (codigo: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.distritos.delete(codigo));
  },

  search: async (query: string): Promise<Distrito[]> => {
    const response = await api.get(`${API_ENDPOINTS.distritos.search}?q=${query}`);
    return response.data;
  },
}; 