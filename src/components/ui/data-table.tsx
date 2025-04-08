"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

interface DataTableProps<T> {
  columns: {
    header: string
    accessorKey: keyof T
  }[]
  data: T[]
  title: string
  onAdd: () => void
  onEdit: (item: T) => void
  onDelete: (item: T) => void
}

export function DataTable<T>({
  columns,
  data,
  title,
  onAdd,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={onAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Nuevo
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.accessorKey)}>{column.header}</TableHead>
              ))}
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={String(column.accessorKey)}>
                    {String(item[column.accessorKey])}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 