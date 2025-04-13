import { TipoPlato, CreateTipoPlatoRequest, UpdateTipoPlatoRequest } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';
import { api } from '../api/api';

export const tipoPlatoService = {
  getAll: async (): Promise<TipoPlato[]> => {
    const response = await api.get(API_ENDPOINTS.tipoPlatos.list);
    return response.data;
  },

  getAllActive: async (): Promise<TipoPlato[]> => {
    const response = await api.get(API_ENDPOINTS.tipoPlatos.listActive);
    return response.data;
  },

  getByCodigo: async (codigo: string): Promise<TipoPlato> => {
    const response = await api.get(API_ENDPOINTS.tipoPlatos.detail(codigo));
    return response.data;
  },

  create: async (tipoPlato: CreateTipoPlatoRequest): Promise<TipoPlato> => {
    const response = await api.post(API_ENDPOINTS.tipoPlatos.create, tipoPlato);
    return response.data;
  },

  update: async (codigo: string, tipoPlato: UpdateTipoPlatoRequest): Promise<TipoPlato> => {
    const response = await api.put(API_ENDPOINTS.tipoPlatos.update(codigo), tipoPlato);
    return response.data;
  },

  delete: async (codigo: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.tipoPlatos.delete(codigo));
  },

  search: async (query: string): Promise<TipoPlato[]> => {
    const response = await api.get(`${API_ENDPOINTS.tipoPlatos.search}?q=${query}`);
    return response.data;
  },
}; 