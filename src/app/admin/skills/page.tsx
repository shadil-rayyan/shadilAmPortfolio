import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSkillsPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Skills</h1>
        <Card>
            <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>
                    Update your skills and their descriptions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Skill management interface coming soon!</p>
            </CardContent>
        </Card>
    </div>
  );
}
