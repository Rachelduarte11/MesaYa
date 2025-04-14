import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Inicio
          </Button>
        </div>
      </div>
    </header>
  )
} 