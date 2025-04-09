import api from '../api/config/axios';
import API_ENDPOINTS from '../api/config/endpoints';
import { 
  Pedido, 
  CreatePedidoRequest, 
  UpdatePedidoRequest, 
  ApiResponse 
} from '../api/types';

export const pedidoService = {
  // Get all pedidos
  async getAll(): Promise<Pedido[]> {
    const response = await api.get<Pedido[]>(API_ENDPOINTS.pedidos.list);
    return response.data;
  },

  // Get pedido by code
  async getByCode(codigo: number): Promise<Pedido> {
    const response = await api.get<Pedido>(API_ENDPOINTS.pedidos.detail(codigo.toString()));
    return response.data;
  },

  // Create new pedido
  async create(pedido: CreatePedidoRequest): Promise<Pedido> {
    const response = await api.post<Pedido>(
      API_ENDPOINTS.pedidos.create,
      pedido
    );
    return response.data;
  },

  // Update pedido
  async update(codigo: number, pedido: UpdatePedidoRequest): Promise<Pedido> {
    const response = await api.put<Pedido>(
      API_ENDPOINTS.pedidos.update(codigo.toString()),
      pedido
    );
    return response.data;
  },

  // Delete pedido
  async delete(codigo: number): Promise<void> {
    await api.delete(API_ENDPOINTS.pedidos.delete(codigo.toString()));
  },

  // Search pedidos
  async search(query: string): Promise<Pedido[]> {
    const response = await api.get<Pedido[]>(API_ENDPOINTS.pedidos.search, {
      params: { query }
    });
    return response.data;
  },
};

export default pedidoService; 