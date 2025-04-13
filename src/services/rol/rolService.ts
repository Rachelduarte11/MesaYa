import { Rol, CreateRolRequest, UpdateRolRequest } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';
import api from '../api/config/axios';

export const rolService = {
  getAll: async (): Promise<Rol[]> => {
    const response = await api.get(API_ENDPOINTS.roles.list);
    return response.data;
  },

  getAllActive: async (): Promise<Rol[]> => {
    const response = await api.get(API_ENDPOINTS.roles.listActive);
    return response.data;
  },

  getByCodigo: async (codigo: string): Promise<Rol> => {
    const response = await api.get(API_ENDPOINTS.roles.detail(codigo));
    return response.data;
  },

  create: async (rol: CreateRolRequest): Promise<Rol> => {
    const response = await api.post(API_ENDPOINTS.roles.create, rol);
    return response.data;
  },

  update: async (codigo: string, rol: UpdateRolRequest): Promise<Rol> => {
    const response = await api.put(API_ENDPOINTS.roles.update(codigo), rol);
    return response.data;
  },

  delete: async (codigo: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.roles.delete(codigo));
  },

  search: async (query: string): Promise<Rol[]> => {
    const response = await api.get(`${API_ENDPOINTS.roles.search}?q=${query}`);
    return response.data;
  },
}; 