"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { useEmployeeManagement } from "@/hooks/useEmployeeManagement"
import { useEffect } from "react"
import { StatusBadge } from "@/components/ui/badges/status-badge"
import { DataTable, Column } from "@/components/data-table"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"
import { useCallback } from "react"

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { 
    key: "nombreCompleto", 
    label: "Nombre Completo",
    render: (_, row) => `${row.nombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`
  },
  { key: "documento", label: "Documento" },
  { key: "telefono", label: "Teléfono" },
  { key: "email", label: "Email" },
  { key: "cargo", label: "Cargo" },
  { 
    key: "estado", 
    label: "Estado",
    render: (value: string) => <StatusBadge status={value as any} />
  }
]

export default function AllPersonnelPage() {
  const router = useRouter()
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")
  const { 
    employees,
    loading,
    error,
    fetchEmployees,
    handleDelete: originalHandleDelete,
    handleSearch
  } = useEmployeeManagement()

  const handleDelete = async (id: string) => {
    await originalHandleDelete(Number(id))
  }

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      handleSearch(query)
    }, 500),
    [handleSearch]
  )

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Inicio", href: "/" }, 
              { label: "Personal", href: "/personnel" },
              { label: "Todos los registros" }
            ]} 
          />
          <DataTable
            title="Gestión de Personal"
            description="Administra el personal del restaurante"
            data={employees}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            allRecordsPath="/personnel/all"
            addButtonPath="/personnel/add"
            addButtonLabel="Nuevo Empleado"
            searchPlaceholder="Buscar empleados..."
            searchInputProps={register("search")}
            emptyMessage="No hay empleados disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el empleado."
          />
        </div>
      </div>
    </div>
  )
} 