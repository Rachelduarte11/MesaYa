import { useState } from 'react';
import { platoService } from '@/services/platos/platoService';
import { Plato, CreatePlatoRequest, UpdatePlatoRequest } from '@/services/api/types';

export const usePlatoManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlato = async (plato: CreatePlatoRequest): Promise<Plato | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await platoService.create(plato);
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
      return true;
    } catch (err) {
      setError('Error al eliminar el plato');
      console.error('Error deleting plato:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPlato,
    updatePlato,
    deletePlato,
  };
}; 