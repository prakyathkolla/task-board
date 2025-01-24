import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  onMoveForward: (id: string) => void;
  onMoveBackward: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
}

export const TaskCard = ({
  id,
  title,
  description,
  status,
  onMoveForward,
  onMoveBackward,
  onUpdate,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    onUpdate(id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <Card className="task-card">
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
            <h3 className="font-medium">{title}</h3>
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