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
  async getAll(): Promise<Cliente[]> {
    console.log('Fetching all clients from API...');
    try {
      const response = await api.get<Cliente[]>(API_ENDPOINTS.clientes.list);
      console.log('API Response for getAll:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  // Get all active clientes
  async getAllActive(): Promise<Cliente[]> {
    console.log('Fetching all active clients from API...');
    try {
      const response = await api.get<Cliente[]>(API_ENDPOINTS.clientes.listActive);
      console.log('API Response for getAllActive:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getAllActive:', error);
      throw error;
    }
  },

  // Get cliente by codigo
  async getByCodigo(codigo: string): Promise<Cliente> {
    console.log(`Fetching client with codigo: ${codigo}`);
    try {
      const response = await api.get<Cliente>(API_ENDPOINTS.clientes.detail(codigo));
      console.log('API Response for getByCodigo:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getByCodigo:', error);
      throw error;
    }
  },

  // Create new cliente
  async create(cliente: CreateClienteRequest): Promise<Cliente> {
    console.log('Creating new client:', cliente);
    try {
      const response = await api.post<Cliente>(
        API_ENDPOINTS.clientes.create,
        cliente
      );
      console.log('API Response for create:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  },

  // Update cliente
  async update(cliente: UpdateClienteRequest): Promise<Cliente> {
    console.log('Updating client:', cliente);
    try {
      const response = await api.put<Cliente>(
        API_ENDPOINTS.clientes.update(cliente.codigo),
        cliente
      );
      console.log('API Response for update:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  },

  // Delete cliente
  async delete(codigo: string): Promise<void> {
    console.log(`Deleting client with codigo: ${codigo}`);
    try {
      await api.delete(API_ENDPOINTS.clientes.delete(codigo));
      console.log('Client deleted successfully');
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  },

  // Search clientes
  async search(query: string): Promise<Cliente[]> {
    console.log('Searching clients with query:', query);
    try {
      const response = await api.get<Cliente[]>(API_ENDPOINTS.clientes.search, {
        params: { query }
      });
      console.log('API Response for search:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in search:', error);
      throw error;
    }
  },
};

export default clienteService; 