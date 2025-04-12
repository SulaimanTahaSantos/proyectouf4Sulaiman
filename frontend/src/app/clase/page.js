"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { estudiantes } from "@/clases/clase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2, Pencil } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {isBrowser } from 'react-device-detect';



export default function Clase() {
  const router = useRouter()
  const [estudiantesList, setEstudiantesList] = useState(estudiantes)
  const [showModal, setShowModal] = useState(false)
  const [newEstudiante, setNewEstudiante] = useState({
    nombre: "",
    apellidos: "",
    grupo: "",
    clase: "",
  })
  const [editEstudiante, setEditEstudiante] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEstudiante({
      ...newEstudiante,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editEstudiante) {
      setEstudiantesList((prevEstudiantes) =>
        prevEstudiantes.map((estudiante) =>
          estudiante === editEstudiante ? newEstudiante : estudiante
        )
      )
      setEditEstudiante(null)
    } else {
      setEstudiantesList((prevEstudiantes) => [...prevEstudiantes, newEstudiante])
    }

    setShowModal(false)
    setNewEstudiante({
      nombre: "",
      apellidos: "",
      grupo: "",
      clase: "",
    })
    console.log(editEstudiante ? "Estudiante actualizado:" : "Nuevo estudiante agregado:", newEstudiante)
    console.log("Lista de estudiantes actualizada:", estudiantesList)
  }

  const handleClick = () => {
    console.log("Volver a Home")
    router.push("/home")
  }

  const handleAddUser = () => {
    console.log("Añadir usuario a la clase")
    setShowModal(true)
    setEditEstudiante(null)
    }

  const handleEditUser = (estudiante) => {
    console.log("Editar usuario:", estudiante)
    setNewEstudiante(estudiante)
    setEditEstudiante(estudiante)
    setShowModal(true)
  }

  return (

    <main className="container mx-auto py-4 px-4 sm:py-10 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <Button onClick={handleClick} variant="outline" className="w-full sm:w-auto">
          Volver a Home
        </Button>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <Button onClick={handleAddUser} variant="default" className="w-full sm:w-auto">
              Añadir Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editEstudiante ? "Editar Usuario" : "Añadir Usuario"}</DialogTitle>
              <DialogDescription>
                {editEstudiante
                  ? "Aquí puedes editar los datos de un usuario existente."
                  : "Aquí puedes añadir un nuevo usuario a la clase."}
              </DialogDescription>
            </DialogHeader>
            <Form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre:</Label>
                <Input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={newEstudiante.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apellidos">Apellidos:</Label>
                <Input
                  id="apellidos"
                  type="text"
                  name="apellidos"
                  value={newEstudiante.apellidos}
                  onChange={handleInputChange}
                  placeholder="Apellidos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grupo">Grupo:</Label>
                <Input
                  id="grupo"
                  type="text"
                  name="grupo"
                  value={newEstudiante.grupo}
                  onChange={handleInputChange}
                  placeholder="Grupo"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clase">Clase:</Label>
                <Input
                  id="clase"
                  type="text"
                  name="clase"
                  value={newEstudiante.clase}
                  onChange={handleInputChange}
                  placeholder="Clase"
                />
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">{editEstudiante ? "Actualizar" : "Guardar"}</Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <h1 className="text-2xl font-bold mb-4">Usuarios y Grupos</h1>
      <p className="text-gray-700 mb-6">Aquí puedes gestionar los usuarios y grupos de tu sistema.</p>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden sm:table-cell">Apellidos</TableHead>
              <TableHead className="hidden md:table-cell">Grupo</TableHead>
              <TableHead className="hidden md:table-cell">Clase</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estudiantesList.map((estudiante, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{estudiante.nombre}</TableCell>
                <TableCell className="hidden sm:table-cell">{estudiante.apellidos}</TableCell>
                <TableCell className="hidden md:table-cell">{estudiante.grupo}</TableCell>
                <TableCell className="hidden md:table-cell">{estudiante.clase}</TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditUser(estudiante)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
