import { useState, useCallback, useEffect } from 'react';
import { empleadoService } from '@/services/empleados/empleadoService';
import { Empleado, CreateEmpleadoRequest, UpdateEmpleadoRequest } from '@/services/api/types';

export const useEmployeeManagement = () => {
  const [employees, setEmployees] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 5;

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching all employees...');
      const response = await empleadoService.getAll();
      console.log('Employees response:', response);
      if (response) {
        setEmployees(response);
      } else {
        console.error('No response data received');
        setError('No se pudieron cargar los empleados');
        setEmployees([]);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Error al cargar los empleados: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching active employees...');
      const response = await empleadoService.getAllActive();
      console.log('Active employees response:', response);
      if (response) {
        setEmployees(response);
      } else {
        console.error('No response data received');
        setError('No se pudieron cargar los empleados activos');
        setEmployees([]);
      }
    } catch (err) {
      console.error('Error fetching active employees:', err);
      setError('Error al cargar los empleados activos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveEmployees();
  }, [fetchActiveEmployees]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
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
      setEmployees(prev => prev.filter(emp => Number(emp.codigo) !== codigo));
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
  const currentEmployees = isSearching ? employees : employees.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const createEmployee = async (empleado: CreateEmpleadoRequest): Promise<Empleado | null> => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await empleadoService.create(empleado);
  //     return response;
  //   } catch (err) {
  //     setError('Error al crear el empleado');
  //     console.error('Error creating employee:', err);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateEmployee = async (codigo: string, empleado: UpdateEmpleadoRequest): Promise<Empleado | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await empleadoService.update(codigo, empleado);
      return response;
    } catch (err) {
      setError('Error al actualizar el empleado');
      console.error('Error updating employee:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (codigo: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await empleadoService.delete(codigo);
      return true;
    } catch (err) {
      setError('Error al eliminar el empleado');
      console.error('Error deleting employee:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    employees: currentEmployees,
    loading,
    error,
    currentPage,
    totalPages,
    fetchEmployees,
    fetchActiveEmployees,
    handleSearch,
    handleDelete,
    handlePageChange,
    // createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}; 