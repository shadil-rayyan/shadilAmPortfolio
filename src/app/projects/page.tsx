"use client";

import { useState } from "react";
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
import { Github } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import type { Project } from "@/lib/types";
import allProjectsData from "@/data/projects.json";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(allProjectsData.map(p => p.category)))];

  const filteredProjects =
    filter === "All"
      ? allProjectsData
      : allProjectsData.filter((project) => project.category === filter);

  const renderContent = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project) => (
              <Card key={project.slug} className="project-card-border flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="p-0">
                  <Link href={`/projects/${project.slug}`} className="block relative h-48 w-full overflow-hidden">
                    {project.video ? (
                        <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                    ) : (
                        <Image
                            src={project.image}
                            alt={`Screenshot of ${project.title}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint={project.imageHint}
                        />
                    )}
                  </Link>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="mb-2">
                    <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">{project.title}</Link>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                   <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href={`/projects/${project.slug}`}>Read More</Link>
                        </Button>
                        {project.github && (
                            <Button asChild variant="secondary">
                                <Link href={project.github} target="_blank">
                                    <Github className="h-4 w-4 mr-2" />
                                    GitHub
                                </Link>
                            </Button>
                        )}
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
            <Select onValueChange={setFilter} defaultValue={filter}>
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
