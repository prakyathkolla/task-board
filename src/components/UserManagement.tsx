import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Users } from "lucide-react";

export const UserManagement = () => {
  const [newUserName, setNewUserName] = useState("");
  const { users, currentUser, addUser, switchUser } = useUser();
  const { toast } = useToast();

  const handleAddUser = () => {
    if (!newUserName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a user name",
        variant: "destructive",
      });
      return;
    }

    addUser(newUserName.trim());
    setNewUserName("");
    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="w-40"
        />
        <Button onClick={handleAddUser} variant="outline">
          Add User
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            {currentUser ? currentUser.name : "Select User"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {users.map((user) => (
            <DropdownMenuItem
              key={user.id}
              onClick={() => switchUser(user.id)}
              className="cursor-pointer"
            >
              {user.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};