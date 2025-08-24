'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Database, Palette, Server, Loader2 } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

const icons = {
    Code: <Code className="w-8 h-8 text-primary" />,
    Server: <Server className="w-8 h-8 text-primary" />,
    Database: <Database className="w-8 h-8 text-primary" />,
    Palette: <Palette className="w-8 h-8 text-primary" />,
};

type IconName = keyof typeof icons;

interface Skill {
  id?: string;
  icon: IconName;
  title: string;
  description: string;
}

const fallbackData: Skill[] = [
  {
    id: "1",
    icon: "Code",
    title: "Frontend Development",
    description: "Crafting responsive and performant user interfaces with modern frameworks like React and Next.js. Proficient in HTML, CSS, and JavaScript/TypeScript.",
  },
  {
    id: "2",
    icon: "Server",
    title: "Backend Development",
    description: "Building robust and scalable server-side applications and APIs. Experienced with Node.js, Express, and serverless architectures.",
  },
  {
    id: "3",
    icon: "Database",
    title: "Database Management",
    description: "Designing and managing relational and NoSQL databases. Skilled in SQL (PostgreSQL) and NoSQL (MongoDB, Firebase) technologies.",
  },
  {
    id: "4",
    icon: "Palette",
    title: "UI/UX Design",
    description: "A keen eye for design and user experience. Creating intuitive and accessible interfaces using Figma and following modern design principles.",
  },
];


export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'skills'), (snapshot) => {
      if (snapshot.empty) {
        setSkills(fallbackData);
        setIsLoading(false);
        return;
      }
      const skillsData: Skill[] = [];
      snapshot.forEach((doc) => {
        skillsData.push({ id: doc.id, ...doc.data() } as Skill);
      });
      setSkills(skillsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching skills: ", error);
      setSkills(fallbackData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Section id="skills" className="bg-muted/40">
      <SectionTitle>What I Do</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: "1000px" }}>
        {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 w-full" />)
        ) : (
            skills.map((skill) => (
            <Card key={skill.id} className="text-center transition-all duration-300 transform-gpu hover:-translate-y-2 hover:rotate-x-4 hover:rotate-y-4 hover:shadow-xl" style={{ transformStyle: "preserve-3d" }}>
                <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {icons[skill.icon]}
                </div>
                <CardTitle>{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription>{skill.description}</CardDescription>
                </CardContent>
            </Card>
            ))
        )}
      </div>
    </Section>
  );
}
