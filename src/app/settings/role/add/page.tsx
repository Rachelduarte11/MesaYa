"use client"

import { AddForm, FormField } from "@/components/ui/forms/add-form"
import { rolService } from "@/services/rol/rolService"

export default function AddRolePage() {
  const fields: FormField[] = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre del rol",
      required: true
    },
    {
      name: "estado",
      label: "Activo",
      type: "checkbox",
      defaultValue: true
    }
  ]

  const handleSubmit = async (formData: Record<string, any>) => {
    await rolService.create({
      nombre: formData.nombre,
      estado: formData.estado
    })
  }

  return (
    <AddForm
      title="Nuevo Rol"
      description="Agregue un nuevo rol al sistema"
      fields={fields}
      breadcrumbItems={[
        { label: "Catálogo", href: "/settings" },
        { label: "Roles", href: "/settings/role" },
        { label: "Nuevo Rol" }
      ]}
      onSubmit={handleSubmit}
      cancelPath="/settings/role"
      submitButtonText="Guardar Rol"
    />
  )
} 