import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { ClientManagement } from "@/components/client-management"

export default function ClientManagementPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Client Management</h1>
          <ClientManagement />
        </div>
      </div>
    </div>
  )
}
