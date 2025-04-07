"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Printer, Save, Download } from "lucide-react"

interface BillItem {
  name: string
  quantity: number
  price: number
}

interface BillGeneratorProps {
  clientName?: string
  clientEmail?: string
  tableNumber?: string
  items?: BillItem[]
}

export function BillGenerator({
  clientName = "Floyd Miles",
  clientEmail = "floyd@example.com",
  tableNumber = "4",
  items = [
    { name: "Original Chess Meat Burger With Chips", quantity: 1, price: 23.99 },
    { name: "Fresh Orange Juice With Basil Seed", quantity: 1, price: 12.99 },
    { name: "Meat Sushi Maki With Tuna", quantity: 1, price: 9.99 },
    { name: "Tacos Salsa With Chickens Grilled", quantity: 1, price: 14.99 },
  ],
}: BillGeneratorProps) {
  const [billData, setBillData] = useState({
    clientName,
    clientEmail,
    tableNumber,
    paymentMethod: "Cash",
    notes: "",
    tip: 0,
    items,
  })

  const subtotal = billData.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.05
  const tip = billData.tip
  const total = subtotal + tax + tip

  const handleTipChange = (value: string) => {
    const tipPercentage = Number.parseFloat(value) || 0
    const tipAmount = subtotal * (tipPercentage / 100)
    setBillData({ ...billData, tip: tipAmount })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Bill</CardTitle>
        <CardDescription>Create a bill for the customer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={billData.clientName}
                onChange={(e) => setBillData({ ...billData, clientName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                value={billData.clientEmail}
                onChange={(e) => setBillData({ ...billData, clientEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                value={billData.tableNumber}
                onChange={(e) => setBillData({ ...billData, tableNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                defaultValue={billData.paymentMethod}
                onValueChange={(value) => setBillData({ ...billData, paymentMethod: value })}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="QR Code">QR Code</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Order Items</Label>
            <div className="border rounded-md mt-2">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Qty</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {billData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">{item.name}</td>
                      <td className="px-4 py-2 text-sm">{item.quantity}</td>
                      <td className="px-4 py-2 text-sm">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any special notes for this bill"
                value={billData.notes}
                onChange={(e) => setBillData({ ...billData, notes: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tip">Tip</Label>
              <Select onValueChange={handleTipChange}>
                <SelectTrigger id="tip">
                  <SelectValue placeholder="Select tip percentage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Tip (0%)</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                </SelectContent>
              </Select>

              <div className="mt-4 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tip</span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Printer className="mr-2 h-4 w-4" />
            Print Bill
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

