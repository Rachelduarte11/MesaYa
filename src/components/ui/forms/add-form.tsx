"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FormField {
  name: string
  label: string
  type: "text" | "number" | "email" | "date" | "select" | "checkbox" | "combobox"
  placeholder?: string
  required?: boolean
  options?: { value: string | number; label: string }[]
  defaultValue?: any
  min?: number
  max?: number
  disabled?: boolean
  multiple?: boolean
  loadOptions?: () => Promise<{ value: string | number; label: string }[]>
  valueKey?: string
  labelKey?: string
}

export interface AddFormProps {
  title: string
  description: string
  fields: FormField[]
  breadcrumbItems: { label: string; href?: string }[]
  onSubmit: (formData: Record<string, any>) => Promise<void>
  cancelPath: string
  submitButtonText?: string
  cancelButtonText?: string
  initialData?: Record<string, any>
}

export function AddForm({
  title,
  description,
  fields,
  breadcrumbItems,
  onSubmit,
  cancelPath,
  submitButtonText = "Guardar",
  cancelButtonText = "Cancelar",
  initialData = {}
}: AddFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {}
    fields.forEach(field => {
      initial[field.name] = initialData[field.name] || field.defaultValue || ""
    })
    return initial
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openComboboxes, setOpenComboboxes] = useState<Record<string, boolean>>({})
  const [options, setOptions] = useState<Record<string, { value: string | number; label: string }[]>>({})
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const loadFieldOptions = async () => {
      for (const field of fields) {
        if (field.loadOptions) {
          setLoadingOptions(prev => ({ ...prev, [field.name]: true }))
          try {
            const loadedOptions = await field.loadOptions()
            setOptions(prev => ({ ...prev, [field.name]: loadedOptions }))
          } catch (error) {
            console.error(`Error loading options for ${field.name}:`, error)
            toast({
              title: "Error",
              description: `Error al cargar las opciones para ${field.label}`,
              variant: "destructive",
            })
          } finally {
            setLoadingOptions(prev => ({ ...prev, [field.name]: false }))
          }
        }
      }
    }

    loadFieldOptions()
  }, [fields])

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
      toast({
        title: "Éxito",
        description: "Registro creado correctamente",
      })
      router.push(cancelPath)
    } catch (err) {
      console.error("Error submitting form:", err)
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar los datos",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return (
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            disabled={field.disabled}
          />
        )
      case "select":
        return (
          <Select
            value={formData[field.name]?.toString() || ""}
            onValueChange={(value) => handleChange(field.name, value)}
            disabled={field.disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Seleccionar"} />
            </SelectTrigger>
            <SelectContent>
              {(field.options || options[field.name] || []).map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "combobox":
        const fieldOptions = field.options || options[field.name] || []
        const isLoading = loadingOptions[field.name]
        
        return (
          <Popover 
            open={openComboboxes[field.name]} 
            onOpenChange={(open) => setOpenComboboxes(prev => ({ ...prev, [field.name]: open }))}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openComboboxes[field.name]}
                className="w-full justify-between"
                disabled={field.disabled || isLoading}
              >
                {isLoading ? (
                  <span className="text-muted-foreground">Cargando...</span>
                ) : formData[field.name] ? (
                  fieldOptions.find((option) => option.value === formData[field.name])?.label || field.placeholder || "Seleccionar..."
                ) : (
                  field.placeholder || "Seleccionar..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={field.placeholder || "Buscar..."} />
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                <CommandGroup>
                  {fieldOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value.toString()}
                      onSelect={(currentValue) => {
                        handleChange(field.name, currentValue)
                        setOpenComboboxes(prev => ({ ...prev, [field.name]: false }))
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          formData[field.name] === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )
      case "checkbox":
        return (
          <Checkbox
            id={field.name}
            checked={formData[field.name] || false}
            onCheckedChange={(checked) => handleChange(field.name, checked)}
            disabled={field.disabled}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className={cn(
                  "grid gap-4",
                  fields.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                )}>
                  {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push(cancelPath)}
                  type="button"
                >
                  {cancelButtonText}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : submitButtonText}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}