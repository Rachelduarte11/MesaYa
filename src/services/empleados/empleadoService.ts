import api from '../api/config/axios';
import { Empleado, CreateEmpleadoRequest, UpdateEmpleadoRequest } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';

export const empleadoService = {
  getAll: async (): Promise<Empleado[]> => {
    const response = await api.get(API_ENDPOINTS.empleados.list);
    return response.data;
  },

  getById: async (id: string): Promise<Empleado> => {
    const response = await api.get(API_ENDPOINTS.empleados.detail(id));
    return response.data;
  },

  create: async (data: CreateEmpleadoRequest): Promise<Empleado> => {
    const response = await api.post(API_ENDPOINTS.empleados.create, data);
    return response.data;
  },

  update: async (id: string, data: UpdateEmpleadoRequest): Promise<Empleado> => {
    const response = await api.put(API_ENDPOINTS.empleados.update(id), data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.empleados.delete(id));
  },

  search: async (query: string): Promise<Empleado[]> => {
    const response = await api.get(API_ENDPOINTS.empleados.search, {
      params: { query }
    });
    return response.data;
  }
}; 