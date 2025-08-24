import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Database, Palette, Server } from "lucide-react";

const skills = [
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Frontend Development",
    description: "Crafting responsive and performant user interfaces with modern frameworks like React and Next.js. Proficient in HTML, CSS, and JavaScript/TypeScript.",
  },
  {
    icon: <Server className="w-8 h-8 text-primary" />,
    title: "Backend Development",
    description: "Building robust and scalable server-side applications and APIs. Experienced with Node.js, Express, and serverless architectures.",
  },
  {
    icon: <Database className="w-8 h-8 text-primary" />,
    title: "Database Management",
    description: "Designing and managing relational and NoSQL databases. Skilled in SQL (PostgreSQL) and NoSQL (MongoDB, Firebase) technologies.",
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "UI/UX Design",
    description: "A keen eye for design and user experience. Creating intuitive and accessible interfaces using Figma and following modern design principles.",
  },
];

export function SkillsSection() {
  return (
    <Section id="skills" className="bg-muted/40">
      <SectionTitle>What I Do</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skill, index) => (
          <Card key={index} className="text-center transition-transform duration-300 hover:-translate-y-2">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                {skill.icon}
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
