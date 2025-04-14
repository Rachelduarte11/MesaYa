import api from '../api/config/axios';
import { Empleado, CreateEmpleadoRequest, UpdateEmpleadoRequest, ApiResponse } from '../api/types';
import API_ENDPOINTS from '../api/config/endpoints';

export const empleadoService = {
  getAll: async (): Promise<Empleado[]> => {
    console.log('Fetching all employees from API...');
    try {
      const response = await api.get<Empleado[]>(API_ENDPOINTS.empleados.list);
      console.log('API Response for getAll:', response);
      return response.data;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  getAllActive: async (): Promise<Empleado[]> => {
    const response = await api.get(API_ENDPOINTS.empleados.listActive);
    return response.data;
  },

  getByCodigo: async (codigo: string): Promise<Empleado> => {
    console.log(`Fetching employee with codigo: ${codigo}`);
    try {
      const response = await api.get<Empleado>(API_ENDPOINTS.empleados.detail(codigo));
      console.log('API Response for getByCodigo:', response);
      return response.data;
    } catch (error) {
      console.error('Error in getByCodigo:', error);
      throw error;
    }
  },

  create: async (data: CreateEmpleadoRequest): Promise<Empleado> => {
    console.log('Creating new employee:', data);
    try {
      const response = await api.post<Empleado>(API_ENDPOINTS.empleados.create, data);
      console.log('API Response for create:', response);
      return response.data;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  },

  update: async (codigo: string, data: UpdateEmpleadoRequest): Promise<Empleado> => {
    console.log('Updating employee:', data);
    try {
      const response = await api.put<Empleado>(API_ENDPOINTS.empleados.update(codigo), data);
      console.log('API Response for update:', response);
      return response.data;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  },

  delete: async (codigo: string): Promise<void> => {
    console.log(`Deleting employee with codigo: ${codigo}`);
    try {
      await api.delete(API_ENDPOINTS.empleados.delete(codigo));
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  },

  search: async (query: string): Promise<Empleado[]> => {
    console.log('Searching employees with query:', query);
    try {
      const response = await api.get<Empleado[]>(API_ENDPOINTS.empleados.search, {
        params: { nombre: query }
      });
      console.log('API Response for search:', response);
      return response.data;
    } catch (error) {
      console.error('Error in search:', error);
      throw error;
    }
  }
};

export default empleadoService; 