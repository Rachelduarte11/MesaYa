import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { EmployeeManagement } from "@/components/employee-management"

export default function StaffManagementPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Staff Management</h1>
          <EmployeeManagement />
        </div>
      </div>
    </div>
  )
}

