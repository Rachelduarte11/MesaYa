import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusBadge } from "@/components/ui/badges"

export function OrderDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Pedido</CardTitle>
        <CardDescription>Información detallada del pedido</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Order details content will go here */}
      </CardContent>
      <CardFooter>
        {/* Order actions will go here */}
      </CardFooter>
    </Card>
  )
} 