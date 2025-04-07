import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { ViewOrder } from "@/components/view-order"
import { Breadcrumb } from "@/components/breadcrumb"

export default function VerPedidoPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb items={[{ label: "Pedido", href: "/pedido" }, { label: "Ver Pedido" }]} />
          <h1 className="text-2xl font-bold mb-6">Ver Pedido</h1>
          <ViewOrder />
        </div>
      </div>
    </div>
  )
}

