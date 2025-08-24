"use client";

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
import { ArrowRight, Github } from "lucide-react";
import { allProjectsData } from "@/lib/projects-data";

export function ProjectsSection() {
  const projects = allProjectsData;

  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
        {projects.slice(0, 6).map((project) => (
          <Card key={project.slug} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl transform-gpu hover:-translate-y-2 hover:rotate-x-4 hover:rotate-y-4" style={{ transformStyle: "preserve-3d" }}>
            <CardHeader className="p-0">
              <Link href={project.link} className="block relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint={project.imageHint}
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="mb-2">
                <Link href={project.link} className="hover:text-primary transition-colors">{project.title}</Link>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <Button asChild>
                        <Link href={project.link}>Read More</Link>
                    </Button>
                     <Button asChild variant="outline">
                      <Link href={project.githubLink} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">
            View All Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
