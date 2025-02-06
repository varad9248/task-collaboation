"use client"

import { ClassAttributes, HTMLAttributes, JSX, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, Ref, RefAttributes, useState } from "react"
import { Navbar } from "@/components/structure/NavBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

type Task = {
  id: string
  title: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  dueDate: string
  assignee: string
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

export default function ProjectDetailsPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "task1",
          title: "Design UI mockups",
          priority: "High",
          dueDate: "2023-12-15",
          assignee: "Alice",
        },
        {
          id: "task2",
          title: "Set up database",
          priority: "Medium",
          dueDate: "2023-12-20",
          assignee: "Bob",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [
        {
          id: "task3",
          title: "Implement authentication",
          priority: "High",
          dueDate: "2023-12-18",
          assignee: "Charlie",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "task4",
          title: "Project setup",
          priority: "Low",
          dueDate: "2023-12-10",
          assignee: "David",
        },
      ],
    },
  ])

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceColumn = columns.find((col) => col.id === source.droppableId)
    const destColumn = columns.find((col) => col.id === destination.droppableId)
    const task = sourceColumn?.tasks.find((t) => t.id === draggableId)

    if (!sourceColumn || !destColumn || !task) {
      return
    }

    const newColumns = columns.map((col) => {
      if (col.id === source.droppableId) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== draggableId),
        }
      }
      if (col.id === destination.droppableId) {
        return {
          ...col,
          tasks: [...col.tasks.slice(0, destination.index), task, ...col.tasks.slice(destination.index)],
        }
      }
      return col
    })

    setColumns(newColumns)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Project XYZ</h1>
          <div className="space-x-2">
            <Button variant="outline">Edit Project</Button>
            <Button>Add Task</Button>
          </div>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>A brief overview of the project and its current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Badge>In Progress</Badge>
              <p className="text-sm text-muted-foreground">Due: 2024-03-31</p>
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-background">
                  <AvatarImage src="/avatar1.png" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-background">
                  <AvatarImage src="/avatar2.png" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-background">
                  <AvatarImage src="/avatar3.png" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid gap-4 md:grid-cols-3">
            {columns.map((column) => (
              <div key={column.id}>
                <h2 className="font-semibold mb-2">{column.title}</h2>
                <Droppable droppableId={column.id} isDropDisabled={false}>
                  {(provided: any ) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-muted p-2 rounded-lg min-h-[200px]"
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided:any) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2"
                            >
                              <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3 pt-0">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{task.dueDate}</span>
                                  <span>{task.assignee}</span>
                                </div>

                                <Badge
                                  variant={
                                    task.priority === "Urgent"
                                      ? "destructive"
                                      : task.priority === "High"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="mt-2"
                                >
                                  {task.priority}
                                </Badge>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  )
}

