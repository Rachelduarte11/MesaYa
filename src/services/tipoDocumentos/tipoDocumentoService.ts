import { TipoDocumento, CreateTipoDocumentoRequest, UpdateTipoDocumentoRequest } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';
import api from '../api/config/axios';

export const tipoDocumentoService = {
  getAll: async (): Promise<TipoDocumento[]> => {
    const response = await api.get(API_ENDPOINTS.tipoDocumentos.list);
    return response.data;
  },

  getAllActive: async (): Promise<TipoDocumento[]> => {
    const response = await api.get(API_ENDPOINTS.tipoDocumentos.listActive);
    return response.data;
  },

  getByCodigo: async (codigo: string): Promise<TipoDocumento> => {
    const response = await api.get(API_ENDPOINTS.tipoDocumentos.detail(codigo));
    return response.data;
  },

  create: async (tipoDocumento: CreateTipoDocumentoRequest): Promise<TipoDocumento> => {
    const response = await api.post(API_ENDPOINTS.tipoDocumentos.create, tipoDocumento);
    return response.data;
  },

  update: async (codigo: string, tipoDocumento: UpdateTipoDocumentoRequest): Promise<TipoDocumento> => {
    const response = await api.put(API_ENDPOINTS.tipoDocumentos.update(codigo), tipoDocumento);
    return response.data;
  },

  delete: async (codigo: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.tipoDocumentos.delete(codigo));
  },

  search: async (query: string): Promise<TipoDocumento[]> => {
    const response = await api.get(`${API_ENDPOINTS.tipoDocumentos.search}?q=${query}`);
    return response.data;
  },
}; 