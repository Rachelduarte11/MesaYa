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
      const response = await clienteService.getById(id);
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
  const createClient = useCallback(async (clientData: CreateClienteRequest) => {
    console.log('useClientManagement: Starting createClient with data:', clientData);
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.create(clientData);
      console.log('useClientManagement: Created client:', response);
      setClients((prev) => [...prev, response]);
      return response;
    } catch (err) {
      console.error('useClientManagement: Error creating client:', err);
      setError('Error al crear el cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update client
  const updateClient = useCallback(async (clientData: UpdateClienteRequest) => {
    console.log('useClientManagement: Starting updateClient with data:', clientData);
    setLoading(true);
    setError(null);
    try {
      const response = await clienteService.update(clientData);
      console.log('useClientManagement: Updated client:', response);
      setClients((prev) =>
        prev.map((client) => (client.id === clientData.id ? response : client))
      );
      setCurrentClient(response);
      return response;
    } catch (err) {
      console.error('useClientManagement: Error updating client:', err);
      setError('Error al actualizar el cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete client
  const deleteClient = useCallback(async (id: string) => {
    console.log('useClientManagement: Starting deleteClient for ID:', id);
    setLoading(true);
    setError(null);
    try {
      await clienteService.delete(id);
      console.log('useClientManagement: Deleted client with ID:', id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      if (currentClient?.id === id) {
        setCurrentClient(null);
      }
    } catch (err) {
      console.error('useClientManagement: Error deleting client:', err);
      setError('Error al eliminar el cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentClient]);

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