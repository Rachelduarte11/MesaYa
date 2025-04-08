import api from '../api/config/axios';
import API_ENDPOINTS from '../api/config/endpoints';
import { 
  Cliente, 
  CreateClienteRequest, 
  UpdateClienteRequest, 
  ApiResponse 
} from '../api/types';

export const clienteService = {
  // Get all clientes
  async getAll(): Promise<ApiResponse<Cliente[]>> {
    const response = await api.get<ApiResponse<Cliente[]>>(API_ENDPOINTS.clientes.list);
    return response.data;
  },

  // Get cliente by ID
  async getById(id: string): Promise<ApiResponse<Cliente>> {
    const response = await api.get<ApiResponse<Cliente>>(API_ENDPOINTS.clientes.detail(id));
    return response.data;
  },

  // Create new cliente
  async create(cliente: CreateClienteRequest): Promise<ApiResponse<Cliente>> {
    const response = await api.post<ApiResponse<Cliente>>(
      API_ENDPOINTS.clientes.create,
      cliente
    );
    return response.data;
  },

  // Update cliente
  async update(cliente: UpdateClienteRequest): Promise<ApiResponse<Cliente>> {
    const response = await api.put<ApiResponse<Cliente>>(
      API_ENDPOINTS.clientes.update(cliente.id),
      cliente
    );
    return response.data;
  },

  // Delete cliente
  async delete(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.clientes.delete(id));
  },

  // Search clientes
  async search(query: string): Promise<ApiResponse<Cliente[]>> {
    const response = await api.get<ApiResponse<Cliente[]>>(API_ENDPOINTS.clientes.search, {
      params: { query }
    });
    return response.data;
  },
};

export default clienteService; 