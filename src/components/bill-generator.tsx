import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BillGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generar Factura</CardTitle>
        <CardDescription>Genera una factura para el pedido</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Bill content will go here */}
      </CardContent>
      <CardFooter>
        <Button>Generar Factura</Button>
      </CardFooter>
    </Card>
  )
} 