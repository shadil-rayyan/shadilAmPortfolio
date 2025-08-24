import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminEducationPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Education</h1>
        <Card>
            <CardHeader>
                <CardTitle>Your Education</CardTitle>
                <CardDescription>
                    Update your educational background.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Education management interface coming soon!</p>
            </CardContent>
        </Card>
    </div>
  );
}
