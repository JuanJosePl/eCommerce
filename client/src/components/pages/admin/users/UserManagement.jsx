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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin" },
    { id: 2, name: "María García", email: "maria@example.com", role: "Editor" },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      role: "Viewer",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      setUsers(
        users.map((u) =>
          u.id === currentUser.id ? { ...formData, id: u.id } : u
        )
      );
      toast({
        title: "Usuario actualizado",
        description: `El usuario "${formData.name}" ha sido actualizado correctamente.`,
      });
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
      toast({
        title: "Usuario añadido",
        description: `El usuario "${formData.name}" ha sido añadido correctamente.`,
      });
    }
    setIsDialogOpen(false);
    setCurrentUser(null);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    const userToDelete = users.find((u) => u.id === id);
    setUsers(users.filter((u) => u.id !== id));
    toast({
      title: "Usuario eliminado",
      description: `El usuario "${userToDelete.name}" ha sido eliminado.`,
      variant: "destructive",
      action: <ToastAction altText="Deshacer">Deshacer</ToastAction>,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Gestión de Usuarios</h1>

      <Button onClick={() => setIsDialogOpen(true)} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Añadir Usuario
      </Button>

      <Table>
        <TableCaption>Lista de usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(user)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Rol
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentUser ? "Actualizar Usuario" : "Añadir Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
