import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce site built with Next.js, Stripe for payments, and a custom CMS for product management.",
    image: "https://placehold.co/600x400.png",
    imageHint: "online store",
    link: "#",
    tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets using D3.js and React, enabling real-time data exploration.",
    image: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    link: "#",
    tags: ["React", "D3.js", "Node.js", "Express"],
  },
  {
    title: "AI-Powered Content Generator",
    description: "A web app that leverages generative AI to create marketing copy and blog posts, built with Python, Flask, and a React frontend.",
    image: "https://placehold.co/600x400.png",
    imageHint: "artificial intelligence",
    link: "#",
    tags: ["Python", "Flask", "React", "AI"],
  },
];

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover"
                  data-ai-hint={project.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="mb-2">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <Button asChild className="mt-2">
                    <Link href={project.link}>Read More</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
