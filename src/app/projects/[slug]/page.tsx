'use client';

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

async function getProject(slug: string): Promise<Project | null> {
  const q = query(collection(db, "projects"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  const docData = querySnapshot.docs[0].data();
  return { id: querySnapshot.docs[0].id, ...docData } as Project;
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const fetchedProject = await getProject(params.slug);
        setProject(fetchedProject);
      } catch (e) {
        console.error("Failed to fetch project", e);
        setError("Failed to load project data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [params.slug]);


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      );
    }

    if (error || !project) {
       return (
        <div className="text-center">
            <h1 className="text-4xl font-bold">{error ? 'Error' : 'Project Not Found'}</h1>
            <p className="mt-4 text-muted-foreground">
                {error || "Sorry, we couldn't find the project you're looking for."}
            </p>
            <Link href="/" className="mt-6 inline-block text-primary hover:underline">
                Back to homepage
            </Link>
        </div>
      );
    }

    return (
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-primary">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {project.githubLink && (
              <Button asChild variant="outline" size="sm">
                <Link href={project.githubLink} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            )}
          </div>
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={project.image}
              alt={`Hero image for ${project.title}`}
              fill
              className="object-cover"
              data-ai-hint={project.imageHint}
            />
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/80 mb-12">
            <p>{project.longDescription}</p>
          </div>
        </article>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <Button asChild variant="ghost">
                    <Link href="/#projects" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
            </div>
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
