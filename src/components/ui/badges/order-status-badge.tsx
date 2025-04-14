import { Badge } from "@/components/ui/badge"

type OrderStatus = 'PENDIENTE' | 'EN_PREPARACION' | 'ENTREGADO' | 'CANCELADO' | 'COMPLETADO' | string

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const statusStyles: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  EN_PREPARACION: 'bg-blue-100 text-blue-800',
  ENTREGADO: 'bg-green-100 text-green-800',
  CANCELADO: 'bg-red-100 text-red-800',
  COMPLETADO: 'bg-green-100 text-green-800'
}

const statusLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  ENPREPARACION: 'En Preparación',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
  COMPLETADO: 'Completado'
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800'
  const label = statusLabels[status] || status

  return (
    <Badge className={style}>
      {label}
    </Badge>
  )
} 