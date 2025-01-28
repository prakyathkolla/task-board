import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  onMoveForward: (id: string) => void;
  onMoveBackward: (id: string) => void;
  onUpdate: (id: string, title: string, description: string, priority: "low" | "medium" | "high") => void;
}

const PRIORITIES = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
];

const getPriorityColor = (priority: "low" | "medium" | "high") => {
  switch (priority) {
    case "low":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  }
};

export const TaskCard = ({
  id,
  title,
  description,
  status,
  priority,
  onMoveForward,
  onMoveBackward,
  onUpdate,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);

  const handleSave = () => {
    onUpdate(id, editTitle, editDescription, editPriority);
    setIsEditing(false);
  };

  return (
    <Card className="task-card p-4 mb-4">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description"
          />
          <Select value={editPriority} onValueChange={(value: "low" | "medium" | "high") => setEditPriority(value)}>
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
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-1">
              <h3 className="font-medium">{title}</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${getPriorityColor(priority)}`}>
                {PRIORITIES.find(p => p.value === priority)?.label}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveBackward(id)}
              disabled={status === "backlog"}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveForward(id)}
              disabled={status === "done"}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};