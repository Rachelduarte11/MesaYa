import { useState, useCallback } from 'react';
import { clienteService } from '@/services/clientes/clienteService';
import { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/services/api/types';

export const useClientManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Cliente[]>([]);
  const [currentClient, setCurrentClient] = useState<Cliente | null>(null);

  // Fetch all clients
  const fetchClients = useCallback(async () => {
    console.log('useClientManagement: Starting fetchClients');
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.getAll();
      console.log('useClientManagement: Received clients data:', response);
      setClients(response);
    } catch (err) {
      console.error('useClientManagement: Error fetching clients:', err);
      setError('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single client
  const fetchClient = useCallback(async (id: string) => {
    console.log('useClientManagement: Starting fetchClient for ID:', id);
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.getByCodigo(id);
      console.log('useClientManagement: Received client data:', response);
      setCurrentClient(response);
    } catch (err) {
      console.error('useClientManagement: Error fetching client:', err);
      setError('Error al cargar el cliente');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new client
  const createClient = async (cliente: CreateClienteRequest): Promise<Cliente | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await clienteService.create(cliente);
      setClients((prev) => [...prev, response]);
      return response;
    } catch (err) {
      setError('Error al crear el cliente');
      console.error('Error creating client:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update client
  const updateClient = async (codigo: string, cliente: UpdateClienteRequest): Promise<Cliente | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await clienteService.update({ ...cliente, codigo });
      setClients((prev) =>
        prev.map((client) => (client.codigo === codigo ? response : client))
      );
      setCurrentClient(response);
      return response;
    } catch (err) {
      setError('Error al actualizar el cliente');
      console.error('Error updating client:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete client
  const deleteClient = async (codigo: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await clienteService.delete(codigo);
      setClients((prev) => prev.filter((client) => client.codigo !== codigo));
      if (currentClient?.codigo === codigo) {
        setCurrentClient(null);
      }
    } catch (err) {
      setError('Error al eliminar el cliente');
      console.error('Error deleting client:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search clients
  const searchClients = useCallback(async (query: string) => {
    console.log('useClientManagement: Starting searchClients with query:', query);
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.search(query);
      console.log('useClientManagement: Search results:', response);
      setClients(response);
    } catch (err) {
      console.error('useClientManagement: Error searching clients:', err);
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