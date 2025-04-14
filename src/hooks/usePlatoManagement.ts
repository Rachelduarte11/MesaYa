import { useState, useCallback, useEffect } from 'react';
import { platoService } from '@/services/platos/platoService';
import { Plato, CreatePlatoRequest, UpdatePlatoRequest } from '@/services/api/types';

export const usePlatoManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [currentPlato, setCurrentPlato] = useState<Plato | null>(null);

  // Fetch all platos
  const fetchPlatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await platoService.getAll();
      console.log('Fetched platos:', response);
      setPlatos(response);
    } catch (err) {
      setError('Error al cargar los platos');
      console.error('Error fetching platos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch active platos
  const fetchActivePlatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await platoService.getAllActive();
      console.log('Fetched active platos:', response);
      setPlatos(response);
    } catch (err) {
      setError('Error al cargar los platos activos');
      console.error('Error fetching active platos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single plato
  const fetchPlato = useCallback(async (codigo: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await platoService.getByCodigo(codigo);
      console.log('Fetched plato:', response);
      setCurrentPlato(response);
    } catch (err) {
      setError('Error al cargar el plato');
      console.error('Error fetching plato:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPlato = async (plato: CreatePlatoRequest): Promise<Plato | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await platoService.create(plato);
      setPlatos((prev) => [...prev, response]);
      return response;
    } catch (err) {
      setError('Error al crear el plato');
      console.error('Error creating plato:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePlato = async (codigo: string, plato: UpdatePlatoRequest): Promise<Plato | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await platoService.update(codigo, plato);
      setPlatos((prev) =>
        prev.map((p) => (p.codigo === codigo ? response : p))
      );
      setCurrentPlato(response);
      return response;
    } catch (err) {
      setError('Error al actualizar el plato');
      console.error('Error updating plato:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePlato = async (codigo: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await platoService.delete(codigo);
      setPlatos((prev) => prev.filter((p) => p.codigo !== codigo));
      if (currentPlato?.codigo === codigo) {
        setCurrentPlato(null);
      }
      return true;
    } catch (err) {
      setError('Error al eliminar el plato');
      console.error('Error deleting plato:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Search platos
  const searchPlatos = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await platoService.search(query);
      console.log('Searched platos:', response);
      setPlatos(response);
    } catch (err) {
      setError('Error al buscar platos');
      console.error('Error searching platos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    platos,
    currentPlato,
    fetchPlatos,
    fetchActivePlatos,
    fetchPlato,
    createPlato,
    updatePlato,
    deletePlato,
    searchPlatos,
  };
}; 