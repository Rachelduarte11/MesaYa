"use client"

import { AddForm, FormField } from "@/components/ui/forms/add-form"
import { tipoDocumentoService } from "@/services/tipoDocumento/tipoDocumentoService"
import { distritoService } from "@/services/distritos/distritoService"
import { sexoService } from "@/services/sexos/sexoService"
import { rolService } from "@/services/rol/rolService"
import { NewEmpleadoRequest } from "@/services/api/types"
import { empleadoService } from "@/services/empleados/empleadoService"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AddPersonnelPage() {
  const router = useRouter()

  const fields: FormField[] = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre",
      required: true
    },
    {
      name: "apellidoPaterno",
      label: "Apellido Paterno",
      type: "text",
      placeholder: "Ingrese el apellido paterno",
      required: true
    },
    {
      name: "apellidoMaterno",
      label: "Apellido Materno",
      type: "text",
      placeholder: "Ingrese el apellido materno",
      required: true
    },
    {
      name: "tipoDocumentoId",
      label: "Tipo de Documento",
      type: "select",
      placeholder: "Seleccione tipo de documento",
      required: true,
      loadOptions: async () => {
        const tipos = await tipoDocumentoService.getAllActive()
        return tipos.map(tipo => ({
          value: tipo.codigo,
          label: tipo.nombre
        }))
      }
    },
    {
      name: "documento",
      label: "Número de Documento",
      type: "text",
      placeholder: "Ingrese el número de documento",
      required: true
    },
    {
      name: "rolId",
      label: "Rol",
      type: "select",
      placeholder: "Seleccione rol",
      required: true,
      loadOptions: async () => {
        const roles = await rolService.getAllActive()
        return roles.map(rol => ({
          value: rol.codigo,
          label: rol.nombre
        }))
      }
    },
    {
      name: "distritoId",
      label: "Distrito",
      type: "select",
      placeholder: "Seleccione distrito",
      required: true,
      loadOptions: async () => {
        const distritos = await distritoService.getAllActive()
        return distritos.map(distrito => ({
          value: distrito.codigo,
          label: distrito.nombre
        }))
      }
    },
    {
      name: "direccion",
      label: "Dirección",
      type: "text",
      placeholder: "Ingrese la dirección",
      required: true
    },
    {
      name: "telefono",
      label: "Teléfono",
      type: "text",
      placeholder: "Ingrese el teléfono",
      required: true
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Ingrese el email",
      required: true
    },
    {
      name: "fechaNacimiento",
      label: "Fecha de Nacimiento",
      type: "date",
      required: true
    },
    {
      name: "fechaIngreso",
      label: "Fecha de Ingreso",
      type: "date",
      required: true,
      defaultValue: new Date().toISOString().split('T')[0]
    },
    {
      name: "sueldo",
      label: "Sueldo",
      type: "number",
      placeholder: "Ingrese el sueldo",
      required: true,
      min: 0
    },
    
  ]

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      // Format dates to DD/MM/YYYY format
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      }

      // Create the employee object with the exact structure required by the API
      const newEmpleado = {
        nombre: String(formData.nombre || ""),
        apellidoPaterno: String(formData.apellidoPaterno || ""),
        apellidoMaterno: String(formData.apellidoMaterno || ""),
        documento: String(formData.documento || ""),
        direccion: String(formData.direccion || ""),
        telefono: String(formData.telefono || ""),
        email: String(formData.email || ""),
        fechaNacimiento: formatDate(formData.fechaNacimiento),
        fechaIngreso: formatDate(formData.fechaIngreso),
        estado: Boolean(formData.estado),
        sueldo: Number(formData.sueldo || 0),
        tipoDocumentoId: Number(formData.tipoDocumentoId || 0),
        rolId: Number(formData.rolId || 0),
        distritoId: Number(formData.distritoId || 0)
      }

      console.log('Submitting employee data:', newEmpleado)
      const response = await empleadoService.create(newEmpleado)
      console.log('Employee created successfully:', response)
      
      toast.success("Personal creado exitosamente")
      router.push("/personnel")
    } catch (error) {
      console.error("Error creating employee:", error)
      toast.error("Error al crear el personal")
      throw error
    }
  }

  return (
    <AddForm
      title="Nuevo Personal"
      description="Agregue un nuevo miembro del personal al sistema"
      fields={fields}
      breadcrumbItems={[
        { label: "Personal", href: "/personnel" },
        { label: "Agregar Personal" }
      ]}
      onSubmit={handleSubmit}
      cancelPath="/personnel"
      submitButtonText="Guardar Personal"
    />
  )
}