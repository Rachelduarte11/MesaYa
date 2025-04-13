"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { ClientManagement } from "@/components/client-management"
import { useClientManagement } from "@/hooks/useClientManagement"
import { useEffect } from "react"

export default function AllClientsPage() {
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
          <Breadcrumb 
            items={[
              { label: "Inicio", href: "/" }, 
              { label: "Clientes", href: "/clients" },
              { label: "Todos los registros" }
            ]} 
          />
          <div className="mt-6">
            <ClientManagement 
              clients={clients}
              loading={loading}
              error={error}
              onSearch={handleSearch}
              onDelete={deleteClient}
              showAll={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 