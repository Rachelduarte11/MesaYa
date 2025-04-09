'use client';

import { useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { ClientManagement } from "@/components/client-management"
import { useClientManagement } from "@/hooks/useClientManagement"

export default function ClientManagementPage() {
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
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Gestión de Clientes</h1>
          <ClientManagement 
            clients={clients}
            loading={loading}
            error={error}
            onSearch={handleSearch}
            onDelete={deleteClient}
          />
        </div>
      </div>
    </div>
  )
}
