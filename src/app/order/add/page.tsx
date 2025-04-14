import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AddOrder } from "@/components/add-order"

export default function AgregarPedidoPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb items={[{ label: "Pedido", href: "/order" }, { label: "Agregar Pedido" }]} />
          <h1 className="text-2xl font-bold mb-6">Agregar Pedido</h1>
          <AddOrder />
        </div>
      </div>
    </div>
  )
}

