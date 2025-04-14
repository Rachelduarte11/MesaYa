"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { DataTable, Column } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { useDocumentTypeManagement } from "@/hooks/useDocumentTypeManagement"
import { useCallback, useEffect } from "react"
import debounce from "lodash/debounce"
import { StatusBadge } from "@/components/ui/badges/status-badge"

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { key: "nombre", label: "Nombre" },
  { 
    key: "estado", 
    label: "Por Defecto",
    render: (value: string) => <StatusBadge status={value as any} />
  }
]

export default function DocumentTypePage() {
  const router = useRouter()
  const { documentTypes, loading, error, fetchActiveDocumentTypes, handleSearch, handleDelete } = useDocumentTypeManagement()
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")

  const fetchDocumentTypes = useCallback(async (query?: string) => {
    try {
      if (query) {
        handleSearch(query)
      } else {
        fetchActiveDocumentTypes()
      }
    } catch (err) {
      console.error("Error fetching document types:", err)
    }
  }, [fetchActiveDocumentTypes, handleSearch])

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchDocumentTypes(query)
    }, 500),
    [fetchDocumentTypes]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // fetchDocumentTypes()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchDocumentTypes])

  useEffect(() => {
    fetchDocumentTypes()
  }, [fetchDocumentTypes])

  const handleDeleteWrapper = useCallback(async (id: string) => {
    await handleDelete(Number(id))
  }, [handleDelete])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Catálogo", href: "/settings" }, 
                { label: "Tipos de Documento" }
              ]} 
            />
          </div>
          <DataTable
            title="Gestión de Tipos de Documento"
            description="Administra los tipos de documento del sistema"
            data={documentTypes}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={handleDeleteWrapper}
            allRecordsPath="/settings/document-type/all"
            addButtonPath="/settings/document-type/add"
            addButtonLabel="Nuevo Tipo de Documento"
            searchPlaceholder="Buscar tipos de documento..."
            searchInputProps={register("search")}
            emptyMessage="No hay tipos de documento disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el tipo de documento."
          />
        </div>
      </div>
    </div>
  )
} 