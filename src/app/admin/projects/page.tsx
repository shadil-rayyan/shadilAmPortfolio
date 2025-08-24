import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminProjectsPage() {
  return (
    <div>
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Project
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>
                    Here you can add, edit, or delete your projects.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Project list will go here */}
                <p>Project management interface coming soon!</p>
            </CardContent>
        </Card>
    </div>
  );
}
