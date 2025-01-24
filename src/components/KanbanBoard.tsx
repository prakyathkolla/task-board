import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const STATUSES = ["backlog", "todo", "in-progress", "done"];

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const { toast } = useToast();

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title",
        variant: "destructive",
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: "backlog",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const moveTask = (taskId: string, direction: "forward" | "backward") => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = STATUSES.indexOf(task.status);
          const newIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;
          if (newIndex >= 0 && newIndex < STATUSES.length) {
            return { ...task, status: STATUSES[newIndex] };
          }
        }
        return task;
      })
    );
  };

  const updateTask = (taskId: string, newTitle: string, newDescription: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
    toast({
      title: "Success",
      description: "Task updated successfully",
    });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Task Board</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Input
            placeholder="New task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <Button onClick={addTask} className="md:col-span-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATUSES.map((status) => (
          <div key={status} className="kanban-column">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {status.replace("-", " ")}
            </h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onMoveForward={(id) => moveTask(id, "forward")}
                  onMoveBackward={(id) => moveTask(id, "backward")}
                  onUpdate={updateTask}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};