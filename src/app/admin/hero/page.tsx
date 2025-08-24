import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHeroPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Hero Section</h1>
        <Card>
            <CardHeader>
                <CardTitle>Hero Content</CardTitle>
                <CardDescription>
                    Update the headline and description of your hero section.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Hero section management interface coming soon!</p>
            </CardContent>
        </Card>
    </div>
  );
}
