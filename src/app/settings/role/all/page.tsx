"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { RoleManagement } from "@/components/role-management"

export default function AllRolesPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Roles", href: "/settings/role" },
              { label: "Todos los Roles" }
            ]} 
          />
          <div className="mt-6">
            <RoleManagement showAll={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 