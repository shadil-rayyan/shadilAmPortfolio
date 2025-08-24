"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/lib/types";

async function getProjects(): Promise<Project[]> {
    const q = query(collection(db, "projects"), limit(6));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
    });
    return projects;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (e) {
        console.error("Failed to fetch projects", e);
        setError("Could not load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
        {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)
        ) : error ? (
            <p className="text-destructive col-span-full text-center">{error}</p>
        ) : (
            projects.map((project) => (
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
            ))
        )}
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
