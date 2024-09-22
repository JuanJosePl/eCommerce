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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Search } from "lucide-react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      totalOrders: 5,
      totalSpent: 299.95,
    },
    {
      id: 2,
      name: "María García",
      email: "maria@example.com",
      totalOrders: 3,
      totalSpent: 149.97,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      totalOrders: 7,
      totalSpent: 499.93,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CustomerDetails = ({ customer }) => (
    <div>
      <h3 className="font-bold mb-2">Detalles del Cliente</h3>
      <p>
        <strong>Nombre:</strong> {customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Total de Pedidos:</strong> {customer.totalOrders}
      </p>
      <p>
        <strong>Total Gastado:</strong> ${customer.totalSpent.toFixed(2)}
      </p>
      {/* Aquí podrías añadir más detalles como el historial de pedidos */}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>

      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Button>
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </div>

      <Table>
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Pedidos</TableHead>
            <TableHead>Total Gastado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalles del Cliente</DialogTitle>
                    </DialogHeader>
                    <CustomerDetails customer={customer} />
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

export default CustomerManagement;
