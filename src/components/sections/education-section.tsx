'use client';

import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import educationData from '@/data/education.json';

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export function EducationSection() {
  return (
    <Section id="education">
      <SectionTitle>My Education</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu: EducationEntry) => (
          <Card key={edu.id} className="flex flex-col">
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
