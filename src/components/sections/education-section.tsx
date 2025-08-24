import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    period: "2020 - 2022",
    description: "Focused on Artificial Intelligence and Human-Computer Interaction. Published a paper on generative models for UI design.",
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of California, Berkeley",
    period: "2016 - 2020",
    description: "Graduated with honors. Lead developer for the senior capstone project, a mobile app for campus event discovery.",
  },
];

export function EducationSection() {
  return (
    <Section id="education">
      <SectionTitle>My Education</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{edu.degree}</CardTitle>
                  <CardDescription className="pt-1">{edu.institution}</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{edu.period}</p>
              <p className="text-foreground/80">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
