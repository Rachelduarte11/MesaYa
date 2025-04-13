import { Sexo } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';
import api from '../api/config/axios';

export const sexoService = {
  getAll: async (): Promise<Sexo[]> => {
    const response = await api.get(API_ENDPOINTS.sexos.list);
    return response.data;
  },

  getAllActive: async (): Promise<Sexo[]> => {
    const response = await api.get(API_ENDPOINTS.sexos.listActive);
    return response.data;
  },

  getByCodigo: async (codigo: number): Promise<Sexo> => {
    const response = await api.get(API_ENDPOINTS.sexos.detail(codigo));
    return response.data;
  }
}; 