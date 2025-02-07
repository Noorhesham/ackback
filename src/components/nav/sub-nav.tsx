import { Button } from "@/components/ui/button";

export function SubNav() {
  return (
    <div className="flex h-10 items-center space-x-4 border-b bg-muted/50 px-4">
      <Button variant="ghost" size="sm">
        Operations
      </Button>
      <Button variant="ghost" size="sm">
        Reports
      </Button>
      <Button variant="ghost" size="sm">
        Settings
      </Button>
    </div>
  );
}
