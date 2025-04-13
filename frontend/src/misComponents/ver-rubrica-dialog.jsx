"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Mock data for rubric
const rubricaEjemplo = [
    {
        criterio: "Funcionalidad",
        descripcion:
            "La aplicación cumple con todos los requisitos funcionales",
        puntuacion: 3,
        puntuacionMaxima: 4,
    },
    {
        criterio: "Diseño",
        descripcion: "La interfaz es intuitiva y estéticamente agradable",
        puntuacion: 2,
        puntuacionMaxima: 3,
    },
    {
        criterio: "Código",
        descripcion:
            "El código es limpio, bien organizado y sigue buenas prácticas",
        puntuacion: 2.5,
        puntuacionMaxima: 3,
    },
];

export function VerRubricaDialog({ entrega }) {
    const [open, setOpen] = useState(false);

    // Calculate total score
    const puntuacionTotal = rubricaEjemplo.reduce(
        (acc, item) => acc + item.puntuacion,
        0
    );
    const puntuacionMaxima = rubricaEjemplo.reduce(
        (acc, item) => acc + item.puntuacionMaxima,
        0
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver rúbrica aplicada
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Rúbrica de evaluación</DialogTitle>
                    <DialogDescription>
                        Rúbrica aplicada a la entrega de {entrega?.alumno} para{" "}
                        {entrega?.practica}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">
                                    Criterio
                                </TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead className="text-right w-[100px]">
                                    Puntuación
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rubricaEjemplo.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {item.criterio}
                                    </TableCell>
                                    <TableCell>{item.descripcion}</TableCell>
                                    <TableCell className="text-right">
                                        {item.puntuacion} /{" "}
                                        {item.puntuacionMaxima}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    className="font-bold text-right"
                                >
                                    Puntuación total:
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                    {puntuacionTotal} / {puntuacionMaxima}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
}
