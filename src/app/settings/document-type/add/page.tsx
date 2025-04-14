"use client"

import { AddForm, FormField } from "@/components/ui/forms/add-form"
import { tipoDocumentoService } from "@/services/tipoDocumento/tipoDocumentoService"

export default function AddDocumentTypePage() {
  const fields: FormField[] = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre del tipo de documento",
      required: true
    },
    {
      name: "estado",
      label: "Por Defecto",
      type: "checkbox",
      defaultValue: false
    }
  ]

  const handleSubmit = async (formData: Record<string, any>) => {
    await tipoDocumentoService.create({
      nombre: formData.nombre,
      estado: formData.estado
    })
  }

  return (
    <AddForm
      title="Nuevo Tipo de Documento"
      description="Agregue un nuevo tipo de documento al sistema"
      fields={fields}
      breadcrumbItems={[
        { label: "Catálogo", href: "/settings" },
        { label: "Tipos de Documento", href: "/settings/document-type" },
        { label: "Nuevo Tipo de Documento" }
      ]}
      onSubmit={handleSubmit}
      cancelPath="/settings/document-type"
      submitButtonText="Guardar Tipo de Documento"
    />
  )
} 