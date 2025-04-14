import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: boolean
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
      {status ? 'Activo' : 'Inactivo'}
    </Badge>
  )
} 