import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Database, Smartphone, Server } from "lucide-react";
import { db } from "@/lib/db/index";
import { skills } from "@/lib/db/schema";

const icons: Record<string, React.ReactNode> = {
    Code: <Code className="w-8 h-8 text-primary" />,
    Server: <Server className="w-8 h-8 text-primary" />,
    Database: <Database className="w-8 h-8 text-primary" />,
    Smartphone: <Smartphone className="w-8 h-8 text-primary" />,
};

export async function SkillsSection() {
  let skillsData: any[] = [];
  try {
    skillsData = await db.select().from(skills);
  } catch (error) {
    console.error("Failed to fetch skills data:", error);
  }

  return (
    <Section id="skills" className="bg-muted/40">
      <SectionTitle>What I Do</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: "1000px" }}>
        {skillsData.map((skill) => (
          <Card key={skill.id} className="text-center transition-all duration-300 transform-gpu hover:-translate-y-2 hover:rotate-x-4 hover:rotate-y-4 hover:shadow-xl" style={{ transformStyle: "preserve-3d" }}>
              <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {skill.icon && icons[skill.icon] ? icons[skill.icon] : <Code className="w-8 h-8 text-primary" />}
              </div>
              <CardTitle>{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
              <p className="text-muted-foreground">{skill.description}</p>
              </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
