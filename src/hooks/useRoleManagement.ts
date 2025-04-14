import { useState, useCallback, useEffect } from 'react'
import { rolService } from '@/services/rol/rolService'
import { Rol, CreateRolRequest, UpdateRolRequest } from '@/services/api/types'

export const useRoleManagement = () => {
  const [roles, setRoles] = useState<Rol[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching all roles...')
      const response = await rolService.getAll()
      console.log('Roles response:', response)
      if (response) {
        setRoles(response)
      } else {
        console.error('No response data received')
        setError('No se pudieron cargar los roles')
        setRoles([])
      }
    } catch (err) {
      console.error('Error fetching roles:', err)
      setError('Error al cargar los roles: ' + (err instanceof Error ? err.message : 'Error desconocido'))
      setRoles([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchActiveRoles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching active roles...')
      const response = await rolService.getAllActive()
      console.log('Active roles response:', response)
      if (response) {
        setRoles(response)
      } else {
        console.error('No response data received')
        setError('No se pudieron cargar los roles activos')
        setRoles([])
      }
    } catch (err) {
      console.error('Error fetching active roles:', err)
      setError('Error al cargar los roles activos: ' + (err instanceof Error ? err.message : 'Error desconocido'))
      setRoles([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActiveRoles()
  }, [fetchActiveRoles])

  const handleSearch = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolService.search(query)
      if (response) {
        setRoles(response)
      } else {
        setError('No se encontraron resultados')
        setRoles([])
      }
      setCurrentPage(1)
    } catch (err) {
      setError('Error al buscar roles')
      setRoles([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDelete = useCallback(async (codigo: number) => {
    try {
      setLoading(true)
      setError(null)
      await rolService.delete(codigo.toString())
      setRoles(prev => prev.filter(role => Number(role.codigo) !== codigo))
    } catch (err) {
      setError('Error al eliminar el rol')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const totalPages = Math.ceil(roles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRoles = roles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const createRole = async (rol: CreateRolRequest): Promise<Rol | null> => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolService.create(rol)
      return response
    } catch (err) {
      setError('Error al crear el rol')
      console.error('Error creating role:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (codigo: string, rol: UpdateRolRequest): Promise<Rol | null> => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolService.update(codigo, rol)
      return response
    } catch (err) {
      setError('Error al actualizar el rol')
      console.error('Error updating role:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteRole = async (codigo: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await rolService.delete(codigo)
      return true
    } catch (err) {
      setError('Error al eliminar el rol')
      console.error('Error deleting role:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const getByCodigo = async (codigo: string): Promise<Rol | null> => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolService.getByCodigo(codigo)
      return response
    } catch (err) {
      setError('Error al obtener el rol')
      console.error('Error getting role:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    roles: currentRoles,
    loading,
    error,
    currentPage,
    totalPages,
    fetchRoles,
    fetchActiveRoles,
    handleSearch,
    handleDelete,
    handlePageChange,
    createRole,
    updateRole,
    deleteRole,
    getByCodigo,
  }
} 