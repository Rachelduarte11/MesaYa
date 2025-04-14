"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { useEmployeeManagement } from "@/hooks/useEmployeeManagement"
import debounce from "lodash/debounce"
import { DataTable, Column } from "@/components/data-table"
import { StatusBadge } from "@/components/ui/badges/status-badge"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { VerTodosRegistros } from "@/components/ui/buttons/ver-todos-registros"

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
  { key: "sueldo", label: "Sueldo" },
  { 
    key: "rol",
    label: "Rol",
    render: (_, row) => row.rol?.nombre || "Sin rol"
  },
  { 
    key: "estado", 
    label: "Estado",
    render: (value: string) => <StatusBadge status={value as any} />
  }
]

export default function StaffManagementPage() {
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
    fetchActiveEmployees,
    handleDelete: originalHandleDelete,
    handleSearch,
    currentPage,
    totalPages,
    handlePageChange
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
    if (searchTerm.trim() === '') {
      // fetchActiveEmployees()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchActiveEmployees])

  useEffect(() => {
    fetchActiveEmployees()
  }, [fetchActiveEmployees])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Inicio", href: "/" }, 
                { label: "Personal", href: "/personnel" }
              ]} 
            />
            
            <VerTodosRegistros path="/clients/all" />
          </div>

          <DataTable
            title="Gestión de Personal"
            description="Administra el personal del restaurante"
            columns={columns}
            data={employees}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            searchPlaceholder="Buscar personal..."
            searchRegister={register("search")}
            addButtonPath="/personnel/add"
            addButtonLabel="Agregar Personal"
          />
        </div>
      </div>
    </div>
  )
}

