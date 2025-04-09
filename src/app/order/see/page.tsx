'use client';

import { useEffect } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { OrderManagement } from "@/components/order-management"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"
import { Pedido } from "@/services/api/types"

export default function VerPedidoPage() {
  const router = useRouter();

  const handleEdit = (pedido: Pedido) => {
    // Navigate to the edit page with the order code
    router.push(`/order/edit/${pedido.codigo}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb items={[{ label: "Pedido", href: "/pedido" }, { label: "Ver Pedido" }]} />
          <h1 className="text-2xl font-bold mb-6">Ver Pedido</h1>
          <OrderManagement onEdit={handleEdit} />
        </div>
      </div>
    </div>
  )
}

