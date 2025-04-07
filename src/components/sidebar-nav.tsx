"use client"

import { useState } from "react"
import {
  Menu,
  TableIcon as TableBar,
  Users,
  UserCog,
  Truck,
  Receipt,
  Settings,
  LogOut,
  Utensils,
  ShoppingBag,
  PlusCircle,
  Eye,
  ClipboardList,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SidebarNav() {
  const [pedidoExpanded, setPedidoExpanded] = useState(false)

  const navItems = [
    { icon: Menu, label: "Menu", color: "text-green-600" },
    {
      icon: ShoppingBag,
      label: "Pedido",
      color: "text-gray-600",
      hasSubmenu: true,
      path: "/pedido",
      submenuItems: [
        { icon: PlusCircle, label: "Agregar Pedido", path: "/pedido/agregar" },
        { icon: Eye, label: "Ver Pedido", path: "/pedido/ver" },
        { icon: ClipboardList, label: "Detalle de Pedidos", path: "/pedido/detalles" },
      ],
    },
    { icon: Users, label: "Client Management", color: "text-gray-600" },
    { icon: UserCog, label: "Staff Management", color: "text-gray-600" },
    { icon: Utensils, label: "Plates", color: "text-gray-600" },
    { icon: Settings, label: "Settings", color: "text-gray-600" },
  ]

  return (
    <div className="w-64 p-4 border-r h-screen">
      <div className="flex items-center gap-2 mb-8">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg"
          alt="Chili POS Logo"
          className="w-8 h-8"
        />
        <span className="font-semibold">CHILI POS</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <div key={index}>
            {item.hasSubmenu ? (
              <Button
                variant="ghost"
                className={`w-full justify-start ${item.color}`}
                onClick={() => {
                  if (item.hasSubmenu) {
                    setPedidoExpanded(!pedidoExpanded)
                  }
                }}
                asChild={!item.hasSubmenu}
              >
                <div className="flex w-full items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  <div className="ml-auto">
                    {pedidoExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </div>
              </Button>
            ) : (
              <Button variant="ghost" className={`w-full justify-start ${item.color}`}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            )}

            {item.hasSubmenu && pedidoExpanded && (
              <div className="pl-6 mt-1 space-y-1">
                {item.submenuItems.map((subItem, subIndex) => (
                  <Button key={subIndex} variant="ghost" className="w-full justify-start text-gray-600" asChild>
                    <Link href={subItem.path}>
                      <subItem.icon className="mr-2 h-4 w-4" />
                      {subItem.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <Button variant="ghost" className="w-full justify-start mt-auto text-gray-600 absolute bottom-4">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}

