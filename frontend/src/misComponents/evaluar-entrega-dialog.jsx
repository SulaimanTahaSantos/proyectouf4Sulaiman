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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenLine } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

export function EvaluarEntregaDialog({ onSubmit, entrega }) {
    const [formData, setFormData] = useState({
        calificacion: 7,
        feedback: "",
    });
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (value) => {
        setFormData((prev) => ({ ...prev, calificacion: value[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, entregaId: entrega.id });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <PenLine className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Evaluar entrega</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Evaluar entrega</DialogTitle>
                        <DialogDescription>
                            Evalúa la entrega de {entrega?.alumno} para{" "}
                            {entrega?.practica}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="calificacion"
                                className="text-right"
                            >
                                Calificación
                            </Label>
                            <div className="col-span-3 space-y-2">
                                <Slider
                                    id="calificacion"
                                    min={0}
                                    max={10}
                                    step={0.5}
                                    value={[formData.calificacion]}
                                    onValueChange={handleSliderChange}
                                />
                                <div className="flex justify-between">
                                    <span>0</span>
                                    <span className="font-bold">
                                        {formData.calificacion}
                                    </span>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="feedback" className="text-right">
                                Feedback
                            </Label>
                            <Textarea
                                id="feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Proporciona feedback detallado sobre la entrega"
                                rows={5}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Guardar evaluación</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
