"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { DataTable, Column } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { useRoleManagement } from "@/hooks/useRoleManagement"
import { useCallback, useEffect } from "react"
import debounce from "lodash/debounce"
import { StatusBadge } from "@/components/ui/badges/status-badge"

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { key: "codigo", label: "Código" },
  { key: "nombre", label: "Nombre" },
  { 
    key: "estado", 
    label: "Estado",
    render: (value: string) => <StatusBadge status={value as any} />
  }
]

export default function AllRolesPage() {
  const router = useRouter()
  const { roles, loading, error, fetchRoles, handleSearch, handleDelete } = useRoleManagement()
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")

  const fetchAllRoles = useCallback(async (query?: string) => {
    try {
      if (query) {
        handleSearch(query)
      } else {
        fetchRoles()
      }
    } catch (err) {
      console.error("Error fetching roles:", err)
    }
  }, [fetchRoles, handleSearch])

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchAllRoles(query)
    }, 500),
    [fetchAllRoles]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // fetchAllRoles()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchAllRoles])

  useEffect(() => {
    fetchAllRoles()
  }, [fetchAllRoles])

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
                { label: "Roles", href: "/settings/role" },
                { label: "Todos los Roles" }
              ]} 
            />
          </div>
          <DataTable
            title="Todos los Roles"
            description="Lista completa de roles del sistema"
            data={roles}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={handleDeleteWrapper}
            allRecordsPath="/settings/role/all"
            addButtonPath="/settings/role/add"
            addButtonLabel="Nuevo Rol"
            searchPlaceholder="Buscar roles..."
            searchInputProps={register("search")}
            emptyMessage="No hay roles disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el rol."
          />
        </div>
      </div>
    </div>
  )
} 