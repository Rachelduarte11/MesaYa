'use client';

import { useEffect, useCallback } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { useClientManagement } from "@/hooks/useClientManagement"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { useForm } from "react-hook-form"
import debounce from "lodash/debounce"
import { DataTable, Column } from "@/components/data-table"
import { StatusBadge } from "@/components/ui/badges/status-badge";

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
  { key: "direccion", label: "Dirección" },
  { 
    key: "estado", 
    label: "Estado",
    render: (value: string) => <StatusBadge status={value as any} />
  }
]

export default function ClientManagementPage() {
  const router = useRouter()
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")
  const {
    loading,
    error,
    clients,
    fetchActiveClients,
    deleteClient,
    searchClients
  } = useClientManagement()

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      searchClients(query)
    }, 500),
    [searchClients]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // fetchActiveClients()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchActiveClients])

  useEffect(() => {
    fetchActiveClients()
  }, [fetchActiveClients])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Inicio", href: "/" }, 
                { label: "Clientes", href: "/clients" }
              ]} 
            />
          </div>
          <DataTable
            title="Gestión de Clientes"
            description="Administra los clientes del restaurante"
            data={clients}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={deleteClient}
            allRecordsPath="/clients/all"
            addButtonPath="/clients/add"
            addButtonLabel="Nuevo Cliente"
            searchPlaceholder="Buscar clientes..."
            searchInputProps={register("search")}
            emptyMessage="No hay clientes disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el cliente."
          />
        </div>
      </div>
    </div>
  )
}
