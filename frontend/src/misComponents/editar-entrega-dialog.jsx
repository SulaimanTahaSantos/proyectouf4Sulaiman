"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function EditarEntregaDialog({ onSubmit, entrega }) {
    const [formData, setFormData] = useState({
        alumno: "",
        practica: "",
        modulo: "",
        fechaEntrega: "",
        estado: "",
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (entrega) {
            setFormData({
                alumno: entrega.alumno,
                practica: entrega.practica,
                modulo: entrega.modulo,
                fechaEntrega: entrega.fechaEntrega,
                estado: entrega.estado,
            });
        }
    }, [entrega]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, id: entrega.id });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar entrega
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar entrega</DialogTitle>
                        <DialogDescription>
                            Modifica los datos de la entrega.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="alumno" className="text-right">
                                Alumno
                            </Label>
                            <Input
                                id="alumno"
                                name="alumno"
                                value={formData.alumno}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="practica" className="text-right">
                                Práctica
                            </Label>
                            <Input
                                id="practica"
                                name="practica"
                                value={formData.practica}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="modulo" className="text-right">
                                Módulo
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.modulo}
                                    onValueChange={(value) =>
                                        handleSelectChange("modulo", value)
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un módulo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Desarrollo Web">
                                            Desarrollo Web
                                        </SelectItem>
                                        <SelectItem value="Backend">
                                            Backend
                                        </SelectItem>
                                        <SelectItem value="Diseño Web">
                                            Diseño Web
                                        </SelectItem>
                                        <SelectItem value="Bases de Datos">
                                            Bases de Datos
                                        </SelectItem>
                                        <SelectItem value="Seguridad">
                                            Seguridad
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="fechaEntrega"
                                className="text-right"
                            >
                                Fecha
                            </Label>
                            <Input
                                id="fechaEntrega"
                                name="fechaEntrega"
                                type="date"
                                value={formData.fechaEntrega}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="estado" className="text-right">
                                Estado
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={formData.estado}
                                    onValueChange={(value) =>
                                        handleSelectChange("estado", value)
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pendiente">
                                            Pendiente
                                        </SelectItem>
                                        <SelectItem value="Entregado">
                                            Entregado
                                        </SelectItem>
                                        <SelectItem value="Evaluado">
                                            Evaluado
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Guardar cambios</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
