import api from '../api/config/axios';
import { Empleado, CreateEmpleadoRequest, UpdateEmpleadoRequest } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';

export const empleadoService = {
  getAll: async (): Promise<Empleado[]> => {
    const response = await api.get<Empleado[]>(API_ENDPOINTS.empleados.list);
    return response.data;
  },

  getById: async (id: number): Promise<Empleado> => {
    const response = await api.get<Empleado>(API_ENDPOINTS.empleados.detail(id.toString()));
    return response.data;
  },

  create: async (data: CreateEmpleadoRequest): Promise<Empleado> => {
    const response = await api.post<Empleado>(API_ENDPOINTS.empleados.create, data);
    return response.data;
  },

  update: async (data: UpdateEmpleadoRequest): Promise<Empleado> => {
    const response = await api.put<Empleado>(API_ENDPOINTS.empleados.update(data.codigo.toString()), data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.empleados.delete(id.toString()));
  },

  search: async (query: string): Promise<Empleado[]> => {
    const response = await api.get<Empleado[]>(API_ENDPOINTS.empleados.search, {
      params: { query }
    });
    return response.data;
  }
}; 