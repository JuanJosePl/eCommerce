import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye } from "lucide-react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Juan Pérez",
      date: "2023-06-15",
      total: 59.98,
      status: "Pendiente",
    },
    {
      id: 2,
      customer: "María García",
      date: "2023-06-14",
      total: 129.99,
      status: "Enviado",
    },
    {
      id: 3,
      customer: "Carlos Rodríguez",
      date: "2023-06-13",
      total: 89.97,
      status: "Entregado",
    },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const OrderDetails = ({ order }) => (
    <div>
      <h3 className="font-bold mb-2">Detalles del Pedido #{order.id}</h3>
      <p>
        <strong>Cliente:</strong> {order.customer}
      </p>
      <p>
        <strong>Fecha:</strong> {order.date}
      </p>
      <p>
        <strong>Total:</strong> ${order.total.toFixed(2)}
      </p>
      <p>
        <strong>Estado:</strong> {order.status}
      </p>
      {/* Aquí podrías añadir más detalles como los productos del pedido */}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Pedidos</h1>

      <Table>
        <TableCaption>Lista de pedidos recientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                  defaultValue={order.status}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Procesando">Procesando</SelectItem>
                    <SelectItem value="Enviado">Enviado</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalles del Pedido</DialogTitle>
                    </DialogHeader>
                    <OrderDetails order={order} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManagement;
