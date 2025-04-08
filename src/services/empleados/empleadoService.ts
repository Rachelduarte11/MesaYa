import api from '../api/config/axios';
import API_ENDPOINTS from '../api/config/endpoints';
import { 
  Empleado, 
  CreateEmpleadoRequest, 
  UpdateEmpleadoRequest, 
  ApiResponse 
} from '../api/types';

export const empleadoService = {
  // Get all empleados
  async getAll(): Promise<ApiResponse<Empleado[]>> {
    const response = await api.get<ApiResponse<Empleado[]>>(API_ENDPOINTS.empleados.list);
    return response.data;
  },

  // Get empleado by ID
  async getById(id: string): Promise<ApiResponse<Empleado>> {
    const response = await api.get<ApiResponse<Empleado>>(API_ENDPOINTS.empleados.detail(id));
    return response.data;
  },

  // Create new empleado
  async create(empleado: CreateEmpleadoRequest): Promise<ApiResponse<Empleado>> {
    const response = await api.post<ApiResponse<Empleado>>(
      API_ENDPOINTS.empleados.create,
      empleado
    );
    return response.data;
  },

  // Update empleado
  async update(empleado: UpdateEmpleadoRequest): Promise<ApiResponse<Empleado>> {
    const response = await api.put<ApiResponse<Empleado>>(
      API_ENDPOINTS.empleados.update(empleado.id),
      empleado
    );
    return response.data;
  },

  // Delete empleado
  async delete(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.empleados.delete(id));
  },

  // Search empleados
  async search(query: string): Promise<ApiResponse<Empleado[]>> {
    const response = await api.get<ApiResponse<Empleado[]>>(API_ENDPOINTS.empleados.search, {
      params: { query }
    });
    return response.data;
  },
};

export default empleadoService; 