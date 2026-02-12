import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { db } from "@/lib/db/index";
import { education } from "@/lib/db/schema";

export async function EducationSection() {
  let educationData: any[] = [];
  try {
    educationData = await db.select().from(education);
  } catch (error) {
    console.error("Failed to fetch education data:", error);
  }

  return (
    <Section id="education">
      <SectionTitle>My Education</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationData.map((edu) => (
          <Card key={edu.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{edu.degree}</CardTitle>
                  <CardDescription className="pt-1">{edu.school}</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  {edu.image && <Image src={edu.image} alt={`Logo of ${edu.school}`} width={40} height={40} className="rounded-full" />}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{edu.period} {edu.grade ? `• ${edu.grade}` : ""}</p>
              <p className="text-foreground/80">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
