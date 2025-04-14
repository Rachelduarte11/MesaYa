import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { AddOrder } from "@/components/add-order"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AgregarPedidoPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb items={[{ label: "Pedido", href: "/order" }, { label: "Agregar Pedido" }]} />
          <h1 className="text-2xl font-bold mb-6">Agregar Pedido</h1>
          <AddOrder />
        </div>
      </div>
    </div>
  )
}

