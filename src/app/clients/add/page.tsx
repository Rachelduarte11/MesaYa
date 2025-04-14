"use client"

import { AddForm, FormField } from "@/components/ui/forms/add-form"
import { tipoDocumentoService } from "@/services/tipoDocumento/tipoDocumentoService"
import { distritoService } from "@/services/distritos/distritoService"
import { sexoService } from "@/services/sexos/sexoService"
import { clienteService } from "@/services/clientes/clienteService"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreateClienteRequest } from "@/services/api/types"


export default function AddClientPage() {
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
      name: "sexoId",
      label: "Sexo",
      type: "select",
      placeholder: "Seleccione sexo",
      required: true,
      loadOptions: async () => {
        const sexos = await sexoService.getAllActive()
        return sexos.map(sexo => ({
          value: sexo.codigo,
          label: sexo.codigo === 1 ? "Masculino" : sexo.codigo === 2 ? "Femenino" : "Otro"
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
    }

  ]

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      // Format dates to DD/MM/YYYY format
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
      }

      // Create the client object with the exact structure required by the API
      const newCliente: CreateClienteRequest = {
        nombre: String(formData.nombre || ""),
        apellidoPaterno: String(formData.apellidoPaterno || ""),
        apellidoMaterno: String(formData.apellidoMaterno || ""),
        documento: String(formData.documento || ""),
        direccion: String(formData.direccion || ""),
        telefono: String(formData.telefono || ""),
        email: String(formData.email || ""),
        fechaNacimiento: formatDate(formData.fechaNacimiento),
        estado: Boolean(formData.estado),
        distritoId: Number(formData.distritoId || 0),
        sexoId: Number(formData.sexoId || 0),
        tipoDocumentoId: Number(formData.tipoDocumentoId || 0)
      }

      console.log('Submitting client data:', newCliente)
      const response = await clienteService.create(newCliente)
      console.log('Client created successfully:', response)
      
      toast.success("Cliente creado exitosamente")
      router.push("/clients")
    } catch (error) {
      console.error("Error creating client:", error)
      toast.error("Error al crear el cliente")
      throw error
    }
  }

  return (
    <AddForm
      title="Nuevo Cliente"
      description="Agregue un nuevo cliente al sistema"
      fields={fields}
      breadcrumbItems={[
        { label: "Clientes", href: "/clients" },
        { label: "Agregar Cliente" }
      ]}
      onSubmit={handleSubmit}
      cancelPath="/clients"
      submitButtonText="Guardar Cliente"
    />
  )
} 