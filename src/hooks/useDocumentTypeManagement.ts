import { useState, useEffect, useCallback } from 'react'
import { tipoDocumentoService } from '@/services/tipoDocumento/tipoDocumentoService'
import { TipoDocumento } from '@/services/api/types'

export function useDocumentTypeManagement() {
  const [documentTypes, setDocumentTypes] = useState<TipoDocumento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10

  const fetchDocumentTypes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await tipoDocumentoService.getAll()
      setDocumentTypes(response)
      setTotalPages(Math.ceil(response.length / itemsPerPage))
    } catch (err) {
      setError('Error al cargar los tipos de documento')
      console.error('Error fetching document types:', err)
    } finally {
      setLoading(false)
    }
  }, [itemsPerPage])

  const fetchActiveDocumentTypes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await tipoDocumentoService.getAllActive()
      setDocumentTypes(response)
      setTotalPages(Math.ceil(response.length / itemsPerPage))
    } catch (err) {
      setError('Error al cargar los tipos de documento')
      console.error('Error fetching active document types:', err)
    } finally {
      setLoading(false)
    }
  }, [itemsPerPage])

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) {
      fetchDocumentTypes()
      return
    }

    const filtered = documentTypes.filter(docType =>
      docType.nombre.toLowerCase().includes(query.toLowerCase()) ||
      docType.codigo.toString().includes(query)
    )
    setDocumentTypes(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }, [documentTypes, fetchDocumentTypes, itemsPerPage])

  const handleDelete = useCallback(async (codigo: number) => {
    try {
      await tipoDocumentoService.delete(codigo.toString())
      setDocumentTypes(prev => prev.filter(docType => docType.codigo !== codigo))
      setTotalPages(Math.ceil((documentTypes.length - 1) / itemsPerPage))
    } catch (err) {
      setError('Error al eliminar el tipo de documento')
      console.error('Error deleting document type:', err)
    }
  }, [documentTypes.length, itemsPerPage])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const paginatedDocumentTypes = documentTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return {
    documentTypes: paginatedDocumentTypes,
    loading,
    error,
    currentPage,
    totalPages,
    fetchDocumentTypes,
    fetchActiveDocumentTypes,
    handleSearch,
    handleDelete,
    handlePageChange,
  }
} 