"use client"

import { useState } from "react"
import { Navbar } from "@/components/structure/NavBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar } from "@/components/ui/calendar"
import { TaskCreationModal } from "@/components/task/task-creation-modal"

const projectData = [
  { name: "Project A", progress: 75, dueDate: "2023-12-31", tasks: 12, completed: 9 },
  { name: "Project B", progress: 30, dueDate: "2024-01-15", tasks: 8, completed: 2 },
  { name: "Project C", progress: 50, dueDate: "2024-02-28", tasks: 15, completed: 7 },
]

const taskCompletionData = [
  { name: "Mon", completed: 3 },
  { name: "Tue", completed: 5 },
  { name: "Wed", completed: 2 },
  { name: "Thu", completed: 7 },
  { name: "Fri", completed: 4 },
  { name: "Sat", completed: 1 },
  { name: "Sun", completed: 0 },
]

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <TaskCreationModal />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
                <TabsContent value="progress">
                  {projectData.map((project) => (
                    <div key={project.name} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-sm text-muted-foreground">Due: {project.dueDate}</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="tasks">
                  {projectData.map((project) => (
                    <div key={project.name} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{project.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {project.completed}/{project.tasks} tasks
                        </span>
                      </div>
                      <Progress value={(project.completed / project.tasks) * 100} className="h-2" />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={taskCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full">Create Project</Button>
                <Button className="w-full">Assign Task</Button>
                <Button className="w-full">Schedule Meeting</Button>
                <Button className="w-full">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

