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
import { Star } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Mock data for feedback
const feedbackEjemplo = {
    calificacion: 8.5,
    comentarioGeneral:
        "Buen trabajo en general. La aplicación cumple con la mayoría de los requisitos y muestra un buen entendimiento de los conceptos.",
    puntosFuertes: [
        "Excelente implementación de la interfaz de usuario",
        "Buena estructura del código",
        "Documentación clara y completa",
    ],
    areasDeOpportunidad: [
        "Mejorar el manejo de errores",
        "Optimizar el rendimiento en dispositivos móviles",
        "Implementar pruebas unitarias",
    ],
};

export function VerFeedbackDialog({ entrega }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Star className="h-4 w-4 mr-2" />
                    Ver feedback recibido
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Feedback de la entrega</DialogTitle>
                    <DialogDescription>
                        Feedback para la entrega de {entrega?.alumno} en{" "}
                        {entrega?.practica}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Calificación: {feedbackEjemplo.calificacion}/10
                            </CardTitle>
                            <CardDescription>
                                Evaluación general
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{feedbackEjemplo.comentarioGeneral}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Puntos fuertes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                                {feedbackEjemplo.puntosFuertes.map(
                                    (punto, index) => (
                                        <li key={index}>{punto}</li>
                                    )
                                )}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Áreas de oportunidad</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-1">
                                {feedbackEjemplo.areasDeOpportunidad.map(
                                    (area, index) => (
                                        <li key={index}>{area}</li>
                                    )
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
