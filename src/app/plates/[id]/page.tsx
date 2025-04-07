'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'

interface Plate {
  id: string
  name: string
  description: string
  price: number
  category: string
  isAvailable: boolean
}

export default function PlateDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [plate, setPlate] = useState<Plate | null>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Mock data - in a real app, this would come from an API
  const mockPlates: Plate[] = [
    {
      id: 'plate-1',
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh vegetables',
      price: 12.99,
      category: 'Main Course',
      isAvailable: true,
    },
    {
      id: 'plate-2',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 8.99,
      category: 'Appetizer',
      isAvailable: true,
    },
    {
      id: 'plate-3',
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with vanilla ice cream',
      price: 6.99,
      category: 'Dessert',
      isAvailable: true,
    },
    {
      id: 'plate-4',
      name: 'Margherita Pizza',
      description: 'Traditional pizza with tomato and mozzarella',
      price: 14.99,
      category: 'Main Course',
      isAvailable: false,
    },
  ]

  useEffect(() => {
    const foundPlate = mockPlates.find((p) => p.id === params.id)
    setPlate(foundPlate || null)
    setLoading(false)
    setIsClient(true)
  }, [params.id])

  if (loading) {
    return <div className="text-center py-8">Loading plate details...</div>
  }

  if (!plate) {
    return <div className="text-center py-8">Plate not found</div>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plate Details</h1>
        <Button variant="outline" onClick={() => router.push('/plates')}>
          Back to Plates
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{plate.name}</CardTitle>
          <CardDescription>View plate details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Name</label>
              <Input value={plate.name} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Category</label>
              <Input value={plate.category} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Price</label>
              <Input value={`$${plate.price.toFixed(2)}`} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Status</label>
              <div className="col-span-3">
                <Badge className={plate.isAvailable ? 'bg-green-500' : 'bg-red-500'}>
                  {plate.isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Description</label>
              <Input value={plate.description} readOnly className="col-span-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
} 