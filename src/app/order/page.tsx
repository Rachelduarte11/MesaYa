'use client';

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { OrderManagement } from "@/components/order-management"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Pedido } from "@/services/api/types"

export default function OrderPage() {
  const router = useRouter();

  const handleEdit = (pedido: Pedido) => {
    router.push(`/order/${pedido.codigo}/edit`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={[{ label: "Pedido", href: "/order" }, { label: "Ver Pedido" }]} />
            <Button 
              variant="outline"
              className="text-black border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600"
              onClick={() => router.push('/order/all')}
            >
              Ver todos los registros
            </Button>
          </div>
          <OrderManagement onEdit={handleEdit} showAll={false} />
        </div>
      </div>
    </div>
  )
} 