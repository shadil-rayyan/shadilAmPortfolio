'use client';

import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Database, Palette, Server } from "lucide-react";
import skillsData from '@/data/skills.json';

const icons = {
    Code: <Code className="w-8 h-8 text-primary" />,
    Server: <Server className="w-8 h-8 text-primary" />,
    Database: <Database className="w-8 h-8 text-primary" />,
    Palette: <Palette className="w-8 h-8 text-primary" />,
};

type IconName = keyof typeof icons;

interface Skill {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-muted/40">
      <SectionTitle>What I Do</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: "1000px" }}>
        {skillsData.map((skill: Skill) => (
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
        ))}
      </div>
    </Section>
  );
}
