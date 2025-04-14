'use client';

import { useEffect, useCallback } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { ClientManagement } from "@/components/client-management"
import { useClientManagement } from "@/hooks/useClientManagement"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { useForm } from "react-hook-form"
import debounce from "lodash/debounce"

type SearchFormData = {
  search: string
}

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
    fetchClients,
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
      fetchClients()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchClients])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Inicio", href: "/" }, 
                { label: "Clientes", href: "/clients" }
              ]} 
            />
            <Button 
              variant="outline"
              className="text-black border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600"
              onClick={() => router.push('/clients/all')}
            >
              Ver todos los registros
            </Button>
          </div>
          <ClientManagement 
            clients={clients}
            loading={loading}
            error={error}
            onDelete={deleteClient}
            searchInputProps={register("search")}
          />
        </div>
      </div>
    </div>
  )
}
