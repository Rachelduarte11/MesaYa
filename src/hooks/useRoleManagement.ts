import { useState, useEffect } from 'react'
import { rolService } from '@/services/rol/rolService'
import { Rol } from '@/services/api/types'

export function useRoleManagement() {
  const [roles, setRoles] = useState<Rol[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  const fetchRoles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolService.getAll()
      setRoles(response)
      setTotalPages(Math.ceil(response.length / itemsPerPage))
    } catch (err) {
      setError('Error al cargar los roles')
      console.error('Error fetching roles:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchActiveRoles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await rolService.getAllActive()
      setRoles(response)
      setTotalPages(Math.ceil(response.length / itemsPerPage))
    } catch (err) {
      setError('Error al cargar los roles')
      console.error('Error fetching active roles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      fetchRoles()
      return
    }

    const filtered = roles.filter(role =>
      role.nombre.toLowerCase().includes(query.toLowerCase()) ||
      role.codigo.toString().includes(query)
    )
    setRoles(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }

  const handleDelete = async (codigo: number) => {
    try {
      await rolService.delete(codigo.toString())
      setRoles(prev => prev.filter(role => role.codigo !== codigo))
      setTotalPages(Math.ceil((roles.length - 1) / itemsPerPage))
    } catch (err) {
      setError('Error al eliminar el rol')
      console.error('Error deleting role:', err)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginatedRoles = roles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return {
    roles: paginatedRoles,
    loading,
    error,
    currentPage,
    totalPages,
    fetchRoles,
    fetchActiveRoles,
    handleSearch,
    handleDelete,
    handlePageChange,
  }
} 