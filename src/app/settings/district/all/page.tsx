"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { DataTable, Column } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { useDistrictManagement } from "@/hooks/useDistrictManagement"
import { useCallback, useEffect } from "react"
import debounce from "lodash/debounce"
import { StatusBadge } from "@/components/ui/badges/status-badge"

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { key: "codigo", label: "Código" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { 
    key: "estado", 
    label: "Estado",
    render: (value: string) => <StatusBadge status={value as any} />
  }
]

export default function AllDistrictsPage() {
  const router = useRouter()
  const { districts, loading, error, fetchDistricts, handleSearch, handleDelete } = useDistrictManagement()
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")

  const fetchAllDistricts = useCallback(async (query?: string) => {
    try {
      if (query) {
        handleSearch(query)
      } else {
        fetchDistricts()
      }
    } catch (err) {
      console.error("Error fetching districts:", err)
    }
  }, [fetchDistricts, handleSearch])

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchAllDistricts(query)
    }, 500),
    [fetchAllDistricts]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // fetchAllDistricts()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchAllDistricts])

  useEffect(() => {
    fetchAllDistricts()
  }, [fetchAllDistricts])

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
                { label: "Distritos", href: "/settings/district" },
                { label: "Todos los Distritos" }
              ]} 
            />
          </div>
          <DataTable
            title="Todos los Distritos"
            description="Lista completa de distritos del sistema"
            data={districts}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={handleDeleteWrapper}
            allRecordsPath="/settings/district/all"
            addButtonPath="/settings/district/add"
            addButtonLabel="Nuevo Distrito"
            searchPlaceholder="Buscar distritos..."
            searchInputProps={register("search")}
            emptyMessage="No hay distritos disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el distrito."
          />
        </div>
      </div>
    </div>
  )
} 