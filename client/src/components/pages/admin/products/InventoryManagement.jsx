import React, { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { AlertTriangle, Plus, Minus } from 'lucide-react'

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Producto 1', stock: 100, lowStockThreshold: 20 },
    { id: 2, name: 'Producto 2', stock: 15, lowStockThreshold: 25 },
    { id: 3, name: 'Producto 3', stock: 50, lowStockThreshold: 30 },
  ])

  const [adjustment, setAdjustment] = useState({ productId: null, quantity: 0 })

  const handleStockAdjustment = () => {
    setInventory(inventory.map(item => 
      item.id === adjustment.productId 
        ? { ...item, stock: item.stock + parseInt(adjustment.quantity) } 
        : item
    ))
    setAdjustment({ productId: null, quantity: 0 })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Inventario</h1>

      <Table>
        <TableCaption>Inventario actual</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre del Producto</TableHead>
            <TableHead>Stock Actual</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                {item.stock <= item.lowStockThreshold ? (
                  <span className="flex items-center text-yellow-500">
                    <AlertTriangle className="mr-2 h-4 w-4" /> Bajo stock
                  </span>
                ) : (
                  <span className="text-green-500">Normal</span>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Ajustar Stock</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajustar Stock para {item.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Cantidad
                        </Label>
                        <Input 
                          id="quantity" 
                          type="number"
                          value={adjustment.quantity} 
                          onChange={(e) => setAdjustment({ productId: item.id, quantity: e.target.value })} 
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button onClick={() => setAdjustment({ productId: item.id, quantity: -1 })}>
                        <Minus className="mr-2 h-4 w-4" /> Decrementar
                      </Button>
                      <Button onClick={() => setAdjustment({ productId: item.id, quantity: 1 })}>
                        <Plus className="mr-2 h-4 w-4" /> Incrementar
                      </Button>
                    </div>
                    <Button onClick={handleStockAdjustment}>Confirmar Ajuste</Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default InventoryManagement