import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Welcome, Admin!</h1>
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Management</CardTitle>
                <CardDescription>
                    Select a section from the sidebar to start editing your portfolio content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>You can manage your projects, skills, education, and more. Any changes you make here will be reflected on your live website.</p>
            </CardContent>
        </Card>
    </div>
  );
}
