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
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SidebarNav() {
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({})
  const pathname = usePathname()

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }))
  }

  const navItems = [
    { icon: Home, label: "Inicio", 
      color: pathname === "/" ? "text-green-600" : "text-gray-600",  
      path: "/" },
    {
      icon: ShoppingBag,
      label: "Pedidos",
      color: pathname.startsWith("/order") ? "text-green-600" : "text-gray-600",
      hasSubmenu: true,
      menuKey: "pedidos",
      path: "/order",
      submenuItems: [
        { icon: Eye, label: "Ver Pedidos", path: "/order" },
        { icon: PlusCircle, label: "Agregar Pedido", path: "/order/add" },
        
        //{ icon: ClipboardList, label: "Detalles de Pedidos", path: "/order/details" },
      ],
    },
    { 
      icon: Users, 
      label: "Clientes", 
      color: pathname.startsWith("/clients") ? "text-green-600" : "text-gray-600", 
      path: "/clients" 
    },
    { 
      icon: UserCog, 
      label: "Personal", 
      color: pathname.startsWith("/personnel") ? "text-green-600" : "text-gray-600", 
      path: "/personnel" 
    },
    { 
      icon: Utensils, 
      label: "Platos", 
      color: pathname.startsWith("/plates") ? "text-green-600" : "text-gray-600", 
      path: "/plates" 
    },
    {
      icon:  Settings,
      label: "Configuración",
      color: pathname.startsWith("/settings") ? "text-green-600" : "text-gray-600",
      hasSubmenu: true,
      menuKey: "settings",
      path: "/settings",
      submenuItems: [
        { icon: Receipt, label: "Tipo de Documento", path: "/settings/document-type" },
        { icon: Users, label: "Rol / Posición", path: "/settings/role" },
        { icon: Home, label: "Distrito", path: "/settings/district" },
      ],
    },
  ]

  return (
    <div className="w-64 p-4 border-r h-screen">
      <div className="flex items-center gap-2 mb-8">
        <img
          src="/images/mesa-ya.png"
          alt="MesaYa Logo"
          className="w-8 h-8"
        />
        <span className="font-semibold">MesaYa</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <div key={index}>
            {item.hasSubmenu ? (
              <Button
                variant="ghost"
                className={`w-full justify-start ${item.color}`}
                onClick={() => {
                  if (item.hasSubmenu && item.menuKey) {
                    toggleSubmenu(item.menuKey)
                  }
                }}
              >
                <div className="flex w-full items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                  <div className="ml-auto">
                    {expandedMenus[item.menuKey as string] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </div>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${item.color}`}
                asChild
              >
                <Link href={item.path}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            )}

            {item.hasSubmenu && expandedMenus[item.menuKey as string] && (
              <div className="pl-6 mt-1 space-y-1">
                {item.submenuItems.map((subItem, subIndex) => (
                  <Button 
                    key={subIndex} 
                    variant="ghost" 
                    className={`w-full justify-start ${pathname === subItem.path ? "text-green-600" : "text-gray-600"}`} 
                    asChild
                  >
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
        Cerrar Sesión
      </Button>
    </div>
  )
}