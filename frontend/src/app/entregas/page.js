"use client";

import { useState } from "react";
import { DownloadCloud, Filter, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { TailwindToast } from "@/misComponents/tailwind-toast";

import { SubirEntregaDialog } from "@/misComponents/subir-entrega-dialog";
import { EvaluarEntregaDialog } from "@/misComponents/evaluar-entrega-dialog";
import { VerRubricaDialog } from "@/misComponents/ver-rubrica-dialog";
import { VerFeedbackDialog } from "@/misComponents/ver-feedback-dialog";
import { NuevaEntregaDialog } from "@/misComponents/nueva-entrega-dialog";
import { EditarEntregaDialog } from "@/misComponents/editar-entrega-dialog";
import { EliminarEntregaDialog } from "@/misComponents/eliminar-entrega-dialog";

const entregasIniciales = [
    {
        id: 1,
        alumno: "Carlos Rodríguez",
        practica: "Desarrollo Web Frontend",
        modulo: "Desarrollo Web",
        fechaEntrega: "2023-04-15",
        estado: "Entregado",
        evaluaciones: 2,
    },
    {
        id: 2,
        alumno: "María López",
        practica: "API REST con Node.js",
        modulo: "Backend",
        fechaEntrega: "2023-04-10",
        estado: "Evaluado",
        evaluaciones: 3,
    },
    {
        id: 3,
        alumno: "Juan Pérez",
        practica: "Diseño Responsive",
        modulo: "Diseño Web",
        fechaEntrega: "2023-04-18",
        estado: "Pendiente",
        evaluaciones: 0,
    },
    {
        id: 4,
        alumno: "Ana Martínez",
        practica: "Base de Datos SQL",
        modulo: "Bases de Datos",
        fechaEntrega: "2023-04-05",
        estado: "Evaluado",
        evaluaciones: 2,
    },
    {
        id: 5,
        alumno: "David García",
        practica: "Seguridad Web",
        modulo: "Seguridad",
        fechaEntrega: "2023-04-20",
        estado: "Entregado",
        evaluaciones: 1,
    },
];

// Mock modules for filtering
const modulos = [
    "Todos",
    "Desarrollo Web",
    "Backend",
    "Diseño Web",
    "Bases de Datos",
    "Seguridad",
];

export default function EntregasPage() {
    const [entregas, setEntregas] = useState(entregasIniciales);
    const [filtroModulo, setFiltroModulo] = useState("Todos");
    const [filtroAlumno, setFiltroAlumno] = useState("");
    const [toasts, setToasts] = useState([]);

    const showToast = ({ title, description, variant }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, description, variant }]);

        // Auto-remove toast after it closes
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3500); // 3000ms for display + 500ms buffer
    };

    // Filter the data based on selected filters
    const entregasFiltradas = entregas.filter((entrega) => {
        const moduloMatch =
            filtroModulo === "Todos" || entrega.modulo === filtroModulo;
        const alumnoMatch =
            filtroAlumno === "" ||
            entrega.alumno.toLowerCase().includes(filtroAlumno.toLowerCase());
        return moduloMatch && alumnoMatch;
    });

    // Function to get badge color based on status
    const getBadgeVariant = (estado) => {
        switch (estado) {
            case "Entregado":
                return "default";
            case "Evaluado":
                return "success";
            case "Pendiente":
                return "secondary";
            default:
                return "outline";
        }
    };

    // Format date to local format
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    // CRUD Operations
    const handleNuevaEntrega = (data) => {
        const newId = Math.max(...entregas.map((e) => e.id)) + 1;
        const newEntrega = { ...data, id: newId };
        setEntregas([...entregas, newEntrega]);
        showToast({
            title: "Entrega creada",
            description: `Se ha creado la entrega para ${data.alumno}`,
        });
    };

    const handleEditarEntrega = (data) => {
        setEntregas(
            entregas.map((entrega) => (entrega.id === data.id ? data : entrega))
        );
        showToast({
            title: "Entrega actualizada",
            description: `Se ha actualizado la entrega de ${data.alumno}`,
        });
    };

    const handleEliminarEntrega = (id) => {
        setEntregas(entregas.filter((entrega) => entrega.id !== id));
        showToast({
            title: "Entrega eliminada",
            description: "La entrega ha sido eliminada correctamente",
            variant: "destructive",
        });
    };

    const handleSubirEntrega = (data) => {
        showToast({
            title: "Entrega subida",
            description: `Se ha subido la entrega para ${data.practica}`,
        });
    };

    const handleEvaluarEntrega = (data) => {
        const entregaActualizada = entregas.find(
            (e) => e.id === data.entregaId
        );
        if (entregaActualizada) {
            entregaActualizada.estado = "Evaluado";
            entregaActualizada.evaluaciones += 1;
            setEntregas([
                ...entregas.filter((e) => e.id !== data.entregaId),
                entregaActualizada,
            ]);
            showToast({
                title: "Evaluación guardada",
                description: `Calificación: ${data.calificacion}/10`,
            });
        }
    };

    const handleDescargarEntrega = (entrega) => {
        showToast({
            title: "Descargando entrega",
            description: `Descargando la entrega de ${entrega.alumno}`,
        });
    };

    return (
        <div className="container mx-auto py-6">
            {toasts.map((toast) => (
                <TailwindToast
                    key={toast.id}
                    title={toast.title}
                    description={toast.description}
                    onClose={() =>
                        setToasts((prev) =>
                            prev.filter((t) => t.id !== toast.id)
                        )
                    }
                />
            ))}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Gestión de Entregas</CardTitle>
                        <CardDescription>
                            Visualiza y gestiona las entregas de los alumnos
                        </CardDescription>
                    </div>
                    <NuevaEntregaDialog onSubmit={handleNuevaEntrega} />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <Select
                                value={filtroModulo}
                                onValueChange={setFiltroModulo}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filtrar por módulo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {modulos.map((modulo) => (
                                        <SelectItem key={modulo} value={modulo}>
                                            {modulo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Input
                                placeholder="Buscar por alumno"
                                value={filtroAlumno}
                                onChange={(e) =>
                                    setFiltroAlumno(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Más filtros
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Filtrar por grupo y otras opciones
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Alumno</TableHead>
                                    <TableHead>Práctica</TableHead>
                                    <TableHead>Módulo</TableHead>
                                    <TableHead>Fecha Entrega</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Evaluaciones</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entregasFiltradas.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-6 text-muted-foreground"
                                        >
                                            No se encontraron entregas con los
                                            filtros seleccionados
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    entregasFiltradas.map((entrega) => (
                                        <TableRow key={entrega.id}>
                                            <TableCell className="font-medium">
                                                {entrega.alumno}
                                            </TableCell>
                                            <TableCell>
                                                {entrega.practica}
                                            </TableCell>
                                            <TableCell>
                                                {entrega.modulo}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(
                                                    entrega.fechaEntrega
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={getBadgeVariant(
                                                        entrega.estado
                                                    )}
                                                >
                                                    {entrega.estado}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {entrega.evaluaciones}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <SubirEntregaDialog
                                                        onSubmit={
                                                            handleSubirEntrega
                                                        }
                                                        entrega={entrega}
                                                    />
                                                    <EvaluarEntregaDialog
                                                        onSubmit={
                                                            handleEvaluarEntrega
                                                        }
                                                        entrega={entrega}
                                                    />

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>
                                                                Más acciones
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <VerRubricaDialog
                                                                entrega={
                                                                    entrega
                                                                }
                                                            />
                                                            <VerFeedbackDialog
                                                                entrega={
                                                                    entrega
                                                                }
                                                            />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleDescargarEntrega(
                                                                        entrega
                                                                    )
                                                                }
                                                            >
                                                                <DownloadCloud className="h-4 w-4 mr-2" />
                                                                Descargar
                                                                entrega
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <EditarEntregaDialog
                                                                onSubmit={
                                                                    handleEditarEntrega
                                                                }
                                                                entrega={
                                                                    entrega
                                                                }
                                                            />
                                                            <EliminarEntregaDialog
                                                                onDelete={
                                                                    handleEliminarEntrega
                                                                }
                                                                entrega={
                                                                    entrega
                                                                }
                                                            />
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
