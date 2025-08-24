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
import type { Project } from "@/lib/types";
import allProjectsData from '@/data/projects.json';

const featuredProjects = allProjectsData.slice(0, 6);

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project: Project) => (
            <Card key={project.slug} className="project-card-border flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="p-0">
                <Link href={`/projects/${project.slug}`} className="block relative h-48 w-full overflow-hidden">
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
                    <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">{project.title}</Link>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
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
