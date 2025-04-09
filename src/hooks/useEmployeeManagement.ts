import { useState, useCallback, useEffect } from 'react';
import { empleadoService } from '@/services/empleados/empleadoService';
import { Empleado } from '@/services/api/types';

export function useEmployeeManagement() {
  const [employees, setEmployees] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await empleadoService.getAll();
      if (response) {
        setEmployees(response);
      } else {
        setError('No se pudieron cargar los empleados');
        setEmployees([]);
      }
    } catch (err) {
      setError('Error al cargar los empleados');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await empleadoService.search(query);
      if (response) {
        setEmployees(response);
      } else {
        setError('No se encontraron resultados');
        setEmployees([]);
      }
      setCurrentPage(1);
    } catch (err) {
      setError('Error al buscar empleados');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (codigo: number) => {
    try {
      setLoading(true);
      setError(null);
      await empleadoService.delete(codigo.toString());
      setEmployees(prev => prev.filter(emp => emp.codigo !== codigo));
    } catch (err) {
      setError('Error al eliminar el empleado');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    employees: currentEmployees,
    loading,
    error,
    currentPage,
    totalPages,
    fetchEmployees,
    handleSearch,
    handleDelete,
    handlePageChange,
  };
} 