"use client"

import { useState } from "react"
import { Navbar } from "@/components/structure/NavBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const initialProjects = [
  {
    name: "Project A",
    status: "In Progress",
    members: [
      { name: "Alice", avatar: "/avatar1.png" },
      { name: "Bob", avatar: "/avatar2.png" },
      { name: "Charlie", avatar: "/avatar3.png" },
    ],
    progress: 75,
    tasks: { total: 20, completed: 15 },
  },
  {
    name: "Project B",
    status: "To Do",
    members: [
      { name: "David", avatar: "/avatar4.png" },
      { name: "Eve", avatar: "/avatar5.png" },
    ],
    progress: 0,
    tasks: { total: 15, completed: 0 },
  },
  {
    name: "Project C",
    status: "Done",
    members: [
      { name: "Frank", avatar: "/avatar6.png" },
      { name: "Grace", avatar: "/avatar7.png" },
      { name: "Henry", avatar: "/avatar8.png" },
      { name: "Ivy", avatar: "/avatar9.png" },
    ],
    progress: 100,
    tasks: { total: 25, completed: 25 },
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredProjects = projects
    .filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "progress") return b.progress - a.progress
      if (sortBy === "tasks") return b.tasks.completed / b.tasks.total - a.tasks.completed / a.tasks.total
      return 0
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-yellow-500"
      case "In Progress":
        return "bg-blue-500"
      case "Done":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button>New Project</Button>
        </div>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search projects..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="tasks">Tasks Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.name} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    {project.members.map((member, index) => (
                      <Avatar key={index} className="border-2 border-background w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.members.length} member{project.members.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Tasks: {project.tasks.completed}/{project.tasks.total}
                  </div>
                  <ResponsiveContainer width={60} height={60}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Completed", value: project.tasks.completed },
                          { name: "Remaining", value: project.tasks.total - project.tasks.completed },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={25}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#4CAF50" />
                        <Cell fill="#FFA000" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

