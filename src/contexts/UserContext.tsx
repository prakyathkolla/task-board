import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  addUser: (name: string) => void;
  switchUser: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addUser = (name: string) => {
    const newUser = {
      id: Date.now().toString(),
      name,
    };
    setUsers((prev) => [...prev, newUser]);
    if (!currentUser) {
      setCurrentUser(newUser);
    }
  };

  const switchUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <UserContext.Provider value={{ users, currentUser, addUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};