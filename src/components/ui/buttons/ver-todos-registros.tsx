import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ListFilter } from "lucide-react"

interface VerTodosRegistrosProps {
  path: string
  className?: string
}

export function VerTodosRegistros({ path, className }: VerTodosRegistrosProps) {
  const router = useRouter()

  return (
    <Button 
      variant="outline" 
      onClick={() => router.push(path)}
      className={className}
    >
      <ListFilter className="mr-2 h-4 w-4" />
      Ver todos los registros
    </Button>
  )
} 