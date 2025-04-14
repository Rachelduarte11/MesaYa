import { useState, useCallback, useEffect } from 'react';
import { distritoService } from '@/services/distritos/distritoService';
import { Distrito, CreateDistritoRequest, UpdateDistritoRequest } from '@/services/api/types';

export const useDistrictManagement = () => {
  const [districts, setDistricts] = useState<Distrito[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchDistricts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching all districts...');
      const response = await distritoService.getAll();
      console.log('Districts response:', response);
      if (response) {
        setDistricts(response);
      } else {
        console.error('No response data received');
        setError('No se pudieron cargar los distritos');
        setDistricts([]);
      }
    } catch (err) {
      console.error('Error fetching districts:', err);
      setError('Error al cargar los distritos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveDistricts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching active districts...');
      const response = await distritoService.getAllActive();
      console.log('Active districts response:', response);
      if (response) {
        setDistricts(response);
      } else {
        console.error('No response data received');
        setError('No se pudieron cargar los distritos activos');
        setDistricts([]);
      }
    } catch (err) {
      console.error('Error fetching active districts:', err);
      setError('Error al cargar los distritos activos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveDistricts();
  }, [fetchActiveDistricts]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await distritoService.search(query);
      if (response) {
        setDistricts(response);
      } else {
        setError('No se encontraron resultados');
        setDistricts([]);
      }
      setCurrentPage(1);
    } catch (err) {
      setError('Error al buscar distritos');
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (codigo: number) => {
    try {
      setLoading(true);
      setError(null);
      await distritoService.delete(codigo.toString());
      setDistricts(prev => prev.filter(dist => Number(dist.codigo) !== codigo));
    } catch (err) {
      setError('Error al eliminar el distrito');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const totalPages = Math.ceil(districts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDistricts = districts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const createDistrict = async (distrito: CreateDistritoRequest): Promise<Distrito | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await distritoService.create(distrito);
      return response;
    } catch (err) {
      setError('Error al crear el distrito');
      console.error('Error creating district:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDistrict = async (codigo: string, distrito: UpdateDistritoRequest): Promise<Distrito | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await distritoService.update(codigo, distrito);
      return response;
    } catch (err) {
      setError('Error al actualizar el distrito');
      console.error('Error updating district:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteDistrict = async (codigo: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await distritoService.delete(codigo);
      return true;
    } catch (err) {
      setError('Error al eliminar el distrito');
      console.error('Error deleting district:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    districts: currentDistricts,
    loading,
    error,
    currentPage,
    totalPages,
    fetchDistricts,
    fetchActiveDistricts,
    handleSearch,
    handleDelete,
    handlePageChange,
    createDistrict,
    updateDistrict,
    deleteDistrict,
  };
}; 