"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Github, Loader2 } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import type { Project } from "@/lib/types";


async function getProjects(): Promise<Project[]> {
  const projectsCol = collection(db, "projects");
  const projectSnapshot = await getDocs(projectsCol);
  const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  return projectList;
}

export default function ProjectsPage() {
  const [allProjectsData, setAllProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projects = await getProjects();
        setAllProjectsData(projects);
      } catch (e) {
        console.error("Failed to fetch projects", e);
        setError("Could not load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);
  
  const categories = ["All", ...Array.from(new Set(allProjectsData.map(p => p.category)))];

  const filteredProjects =
    filter === "All"
      ? allProjectsData
      : allProjectsData.filter((project) => project.category === filter);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      );
    }

    if (error) {
        return <p className="text-center text-destructive">{error}</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
            {filteredProjects.map((project) => (
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
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-center mb-4 sm:text-5xl text-primary">
            All Projects
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Browse through my collection of projects.
          </p>
          <div className="flex justify-center mb-12">
            <Select onValueChange={setFilter} defaultValue={filter} disabled={isLoading || !!error}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderContent()}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
