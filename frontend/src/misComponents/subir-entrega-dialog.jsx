"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { FileUp } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function SubirEntregaDialog({ onSubmit, entrega = null }) {
    const [formData, setFormData] = useState({
        practica: entrega ? entrega.practica : "",
        modulo: entrega ? entrega.modulo : "",
        descripcion: "",
        archivo: null,
    });
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, archivo: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <FileUp className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Subir entrega</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Subir nueva entrega</DialogTitle>
                        <DialogDescription>
                            Completa el formulario para subir tu entrega.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                            <Label htmlFor="descripcion" className="text-right">
                                Descripción
                            </Label>
                            <Textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Describe brevemente tu entrega"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="archivo" className="text-right">
                                Archivo
                            </Label>
                            <Input
                                id="archivo"
                                name="archivo"
                                type="file"
                                onChange={handleFileChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Subir entrega</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
