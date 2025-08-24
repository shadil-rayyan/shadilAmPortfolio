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
import { allProjectsData } from "@/lib/projects-data";
import { BackToTop } from "@/components/back-to-top";

const categories = ["All", ...Array.from(new Set(allProjectsData.map(p => p.category)))];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? allProjectsData
      : allProjectsData.filter((project) => project.category === filter);

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
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
