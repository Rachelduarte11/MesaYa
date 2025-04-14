"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { useClientManagement } from "@/hooks/useClientManagement"
import { useEffect } from "react"
import { DataTable, Column } from "@/components/data-table"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { StatusBadge } from "@/components/ui/badges"

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { 
    key: "nombreCompleto", 
    label: "Nombre Completo",
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

export default function AllClientsPage() {
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
    fetchClients,
    deleteClient,
    searchClients
  } = useClientManagement()

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearch = (term: string) => {
    if (term.trim() === '') {
      fetchClients();
    } else {
      searchClients(term);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Inicio", href: "/" }, 
              { label: "Clientes", href: "/clients" },
              { label: "Todos los registros" }
            ]} 
          />
          <div className="mt-6">
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
    </div>
  )
} 