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
import { Switch } from "@/components/ui/switch";

const CategoryManagement = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([
    { id: 1, name: "Electrónica", slug: "electronica", isActive: true },
    { id: 2, name: "Ropa", slug: "ropa", isActive: true },
    { id: 3, name: "Hogar", slug: "hogar", isActive: false },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = () => {
    setFormData({ ...formData, isActive: !formData.isActive });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCategory) {
      setCategories(
        categories.map((c) =>
          c.id === currentCategory.id ? { ...formData, id: c.id } : c
        )
      );
      toast({
        title: "Categoría actualizada",
        description: `La categoría "${formData.name}" ha sido actualizada correctamente.`,
      });
    } else {
      setCategories([...categories, { ...formData, id: Date.now() }]);
      toast({
        title: "Categoría añadida",
        description: `La categoría "${formData.name}" ha sido añadida correctamente.`,
      });
    }
    setIsDialogOpen(false);
    setCurrentCategory(null);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData(category);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    const categoryToDelete = categories.find((c) => c.id === id);
    setCategories(categories.filter((c) => c.id !== id));
    toast({
      title: "Categoría eliminada",
      description: `La categoría "${categoryToDelete.name}" ha sido eliminada.`,
      variant: "destructive",
      action: <ToastAction altText="Deshacer">Deshacer</ToastAction>,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Gestión de Categorías</h1>

      <Button onClick={() => setIsDialogOpen(true)} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Añadir Categoría
      </Button>

      <Table>
        <TableCaption>Lista de categorías de productos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>{category.isActive ? "Activa" : "Inactiva"}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(category.id)}
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
              {currentCategory ? "Editar Categoría" : "Añadir Nueva Categoría"}
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
                <Label htmlFor="slug" className="text-right">
                  Slug
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Activa
                </Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentCategory ? "Actualizar Categoría" : "Añadir Categoría"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
