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
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Input
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="w-full sm:w-40"
        />
        <Button onClick={handleAddUser} variant="outline" className="w-full sm:w-auto">
          Add User
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Users className="h-4 w-4" />
            {currentUser ? currentUser.name : "Select User"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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