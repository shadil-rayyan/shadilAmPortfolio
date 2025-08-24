'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

interface EducationEntry {
  id?: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const fallbackData = [
  {
    id: "1",
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    period: "2020 - 2022",
    description: "Focused on Artificial Intelligence and Human-Computer Interaction. Published a paper on generative models for UI design.",
  },
  {
    id: "2",
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of California, Berkeley",
    period: "2016 - 2020",
    description: "Graduated with honors. Lead developer for the senior capstone project, a mobile app for campus event discovery.",
  },
];

export function EducationSection() {
  const [educationData, setEducationData] = useState<EducationEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'education'), orderBy('period', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setEducationData(fallbackData);
        setIsLoading(false);
        return;
      }
      const entries: EducationEntry[] = [];
      snapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() } as EducationEntry);
      });
      setEducationData(entries);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching education data: ", error);
      setEducationData(fallbackData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Section id="education">
      <SectionTitle>My Education</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading ? (
            <>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </>
        ) : (
          educationData.map((edu) => (
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
          ))
        )}
      </div>
    </Section>
  );
}
