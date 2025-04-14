import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderDetails } from "@/components/order-details"

export default function OrderDetailsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Order Details</h1>
          <OrderDetails />
        </div>
      </div>
    </div>
  )
}

