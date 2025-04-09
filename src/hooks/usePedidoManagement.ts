import { useState, useCallback } from 'react';
import { pedidoService } from '@/services/pedido/pedidoService';
import { Pedido, CreatePedidoRequest, UpdatePedidoRequest } from '@/services/api/types';

export const usePedidoManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [currentPedido, setCurrentPedido] = useState<Pedido | null>(null);

  // Fetch all pedidos
  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidoService.getAll();
      console.log('Fetched pedidos:', response);
      setPedidos(response);
    } catch (err) {
      setError('Error al cargar los pedidos');
      console.error('Error fetching pedidos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single pedido
  const fetchPedido = useCallback(async (codigo: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidoService.getByCode(codigo);
      console.log('Fetched pedido:', response);
      setCurrentPedido(response);
    } catch (err) {
      setError('Error al cargar el pedido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new pedido
  const createPedido = useCallback(async (pedidoData: CreatePedidoRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidoService.create(pedidoData);
      setPedidos((prev) => [...prev, response]);
      return response;
    } catch (err) {
      setError('Error al crear el pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update pedido
  const updatePedido = useCallback(async (pedidoData: UpdatePedidoRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidoService.update(pedidoData.codigo, pedidoData);
      setPedidos((prev) =>
        prev.map((pedido) => (pedido.codigo === pedidoData.codigo ? response : pedido))
      );
      setCurrentPedido(response);
      return response;
    } catch (err) {
      setError('Error al actualizar el pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete pedido
  const deletePedido = useCallback(async (codigo: number) => {
    setLoading(true);
    setError(null);
    try {
      await pedidoService.delete(codigo);
      setPedidos((prev) => prev.filter((pedido) => pedido.codigo !== codigo));
      if (currentPedido?.codigo === codigo) {
        setCurrentPedido(null);
      }
    } catch (err) {
      setError('Error al eliminar el pedido');
      console.error('Error deleting pedido:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPedido]);

  // Search pedidos
  const searchPedidos = useCallback(async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pedidoService.getAll();
      console.log('Searched pedidos:', response);
      const filtered = response.filter(
        (pedido) =>
          pedido.nombre.toLowerCase().includes(term.toLowerCase()) ||
          pedido.estado_pedido.toLowerCase().includes(term.toLowerCase()) ||
          (pedido.cliente && 
            `${pedido.cliente.nombre} ${pedido.cliente.apellido}`
              .toLowerCase()
              .includes(term.toLowerCase())) ||
          (pedido.empleado && 
            `${pedido.empleado.nombre} ${pedido.empleado.apellidoPaterno}`
              .toLowerCase()
              .includes(term.toLowerCase()))
      );
      setPedidos(filtered);
    } catch (err) {
      setError('Error al buscar pedidos');
      console.error('Error searching pedidos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    pedidos,
    currentPedido,
    fetchPedidos,
    fetchPedido,
    createPedido,
    updatePedido,
    deletePedido,
    searchPedidos,
  };
}; 