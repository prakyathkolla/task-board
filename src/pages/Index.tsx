import { KanbanBoard } from "@/components/KanbanBoard";
import { ModeToggle } from "@/components/mode-toggle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-4">
        <ModeToggle />
      </div>
      <KanbanBoard />
    </div>
  );
};

export default Index;