"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { clienteService } from "@/services/clientes/clienteService"
import { tipoDocumentoService } from "@/services/tipoDocumentos/tipoDocumentoService"
import { distritoService } from "@/services/distritos/distritoService"
import { sexoService } from "@/services/sexos/sexoService"
import { Cliente, TipoDocumento, Distrito, Sexo } from "@/services/api/types"

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [documentTypes, setDocumentTypes] = useState<TipoDocumento[]>([])
  const [districts, setDistricts] = useState<Distrito[]>([])
  const [genders, setGenders] = useState<Sexo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: true,
    fechaNacimiento: "",
    sexo: { codigo: 0 },
    tipoDocumento: { codigo: 0, nombre: "", estado: true },
    distrito: { codigo: 0, nombre: "", estado: true }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [client, docTypes, dists, sexos] = await Promise.all([
          clienteService.getByCodigo(params.id),
          tipoDocumentoService.getAllActive(),
          distritoService.getAllActive(),
          sexoService.getAllActive()
        ])
        setFormData(client)
        setDocumentTypes(docTypes)
        setDistricts(dists)
        setGenders(sexos)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error al cargar los datos. Por favor, intente nuevamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      setFormData(prev => ({ ...prev, fechaNacimiento: formattedDate }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "sexo") {
      const selectedGender = genders.find(g => g.codigo.toString() === value)
      if (selectedGender) {
        setFormData(prev => ({ ...prev, sexo: selectedGender }))
      }
    } else if (name === "tipoDocumento") {
      const selectedDocType = documentTypes.find(dt => dt.codigo.toString() === value)
      if (selectedDocType) {
        setFormData(prev => ({ ...prev, tipoDocumento: selectedDocType }))
      }
    } else if (name === "distrito") {
      const selectedDistrict = districts.find(d => d.codigo.toString() === value)
      if (selectedDistrict) {
        setFormData(prev => ({ ...prev, distrito: selectedDistrict }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await clienteService.update({ ...formData, codigo: params.id })
      router.push("/clients")
    } catch (err) {
      console.error("Error updating client:", err)
      setError("Error al actualizar el cliente. Por favor, intente nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500">{error}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Clientes", href: "/clients" }, 
              { label: "Editar Cliente" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
              <CardDescription>
                Actualice los datos del cliente
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Tipo de Documento</Label>
                    <Select 
                      value={formData.tipoDocumento?.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("tipoDocumento", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.codigo} value={type.codigo.toString()}>
                            {type.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentNumber">Número de Documento</Label>
                    <Input
                      id="documento"
                      name="documento"
                      value={formData.documento}
                      onChange={handleChange}
                      placeholder="Ej: 12345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Juan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="apellidoPaterno"
                      name="apellidoPaterno"
                      value={formData.apellidoPaterno}
                      onChange={handleChange}
                      placeholder="Ej: Pérez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Género</Label>
                    <Select 
                      value={formData.sexo?.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("sexo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.codigo} value={gender.codigo.toString()}>
                            {gender.codigo === 1 ? "Masculino" : gender.codigo === 2 ? "Femenino" : "Otro"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${
                            !formData.fechaNacimiento && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fechaNacimiento ? (
                            format(new Date(formData.fechaNacimiento), "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DayPicker
                          mode="single"
                          selected={formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : undefined}
                          onSelect={handleDateChange}
                          initialFocus
                          showOutsideDays
                          captionLayout="dropdown-buttons"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          classNames={{
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-sm font-normal",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today: "bg-accent text-accent-foreground",
                            day_outside: "text-muted-foreground opacity-50",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                            dropdown: "p-1 bg-popover text-popover-foreground shadow-md rounded-lg border mt-1",
                            dropdown_month: "p-2.5 text-sm rounded-md hover:bg-accent",
                            dropdown_year: "p-2.5 text-sm rounded-md hover:bg-accent",
                            vhidden: "hidden"
                          }}
                          components={{
                            IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                            IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">Distrito</Label>
                    <Select 
                      value={formData.distrito?.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("distrito", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione distrito" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.codigo} value={district.codigo.toString()}>
                            {district.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Ej: Av. Arequipa 123"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej: 999888777"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ej: juan.perez@example.com"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/clients")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 