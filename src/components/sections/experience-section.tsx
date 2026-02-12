import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { db } from "@/lib/db/index";
import { experience } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function ExperienceSection() {
  let experienceData: any[] = [];
  try {
    experienceData = await db.select().from(experience).orderBy(desc(experience.createdAt));
  } catch (error) {
    console.error("Failed to fetch experience data:", error);
  }

  return (
    <Section id="experience">
      <SectionTitle>My Experience</SectionTitle>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienceData.map((exp) => (
            <Card key={exp.id} className="flex flex-col">
                <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                    <CardTitle>{exp.position}</CardTitle>
                    <CardDescription className="pt-1">{exp.company}</CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                    <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                </div>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                <p className="text-foreground/80">{exp.description}</p>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </Section>
  );
}
