import { useState, useCallback } from 'react';
import { clienteService } from '@/services';
import { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/services/api/types';

export const useClientManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Cliente[]>([]);
  const [currentClient, setCurrentClient] = useState<Cliente | null>(null);

  // Fetch all clients
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.getAll();
      setClients(response);
    } catch (err) {
      setError('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single client
  const fetchClient = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.getById(id);
      setCurrentClient(response);
    } catch (err) {
      setError('Error al cargar el cliente');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new client
  const createClient = useCallback(async (clientData: CreateClienteRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.create(clientData);
      setClients((prev) => [...prev, response]);
      return response;
    } catch (err) {
      setError('Error al crear el cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update client
  const updateClient = useCallback(async (clientData: UpdateClienteRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.update(clientData);
      setClients((prev) =>
        prev.map((client) => (client.id === clientData.id ? response : client))
      );
      setCurrentClient(response);
      return response;
    } catch (err) {
      setError('Error al actualizar el cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete client
  const deleteClient = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await clienteService.delete(id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      if (currentClient?.id === id) {
        setCurrentClient(null);
      }
    } catch (err) {
      setError('Error al eliminar el cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentClient]);

  // Search clients
  const searchClients = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.search(query);
      setClients(response);
    } catch (err) {
      setError('Error al buscar clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    clients,
    currentClient,
    fetchClients,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
    searchClients,
  };
}; 