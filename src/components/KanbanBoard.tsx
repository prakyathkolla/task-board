import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { UserManagement } from "./UserManagement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  priority: "low" | "medium" | "high";
}

const STATUSES = ["backlog", "todo", "in-progress", "done"];
const PRIORITIES = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
];

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const { toast } = useToast();
  const { currentUser } = useUser();

  const addTask = () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Please select a user first",
        variant: "destructive",
      });
      return;
    }

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
      userId: currentUser.id,
      priority: newTaskPriority,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority("medium");
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
          const newIndex =
            direction === "forward" ? currentIndex + 1 : currentIndex - 1;
          if (newIndex >= 0 && newIndex < STATUSES.length) {
            return { ...task, status: STATUSES[newIndex] };
          }
        }
        return task;
      })
    );
  };

  const updateTask = (
    taskId: string,
    newTitle: string,
    newDescription: string,
    newPriority: "low" | "medium" | "high"
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription, priority: newPriority }
          : task
      )
    );
    toast({
      title: "Success",
      description: "Task updated successfully",
    });
  };

  const filteredTasks = tasks.filter(
    (task) => currentUser && task.userId === currentUser.id
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Board</h1>
          <UserManagement />
        </div>
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
          <Select
            value={newTaskPriority}
            onValueChange={(value: "low" | "medium" | "high") => setNewTaskPriority(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITIES.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            {filteredTasks
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