
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";
import allProjects from "@/data/projects.json";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

async function getProjectDetails(slug: string): Promise<Project | undefined> {
    try {
        const project = allProjects.find(p => p.slug === slug);
        if (!project) return undefined;
        
        const details = await import(`@/data/projects/${slug}.json`);
        return { ...project, ...details };

    } catch (error) {
        console.error("Could not fetch project details for slug:", slug, error);
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectDetails(params.slug);

  if (!project) {
    return {
      title: "Project Not Found"
    }
  }

  return {
    title: project.title,
    description: project.longDescription || project.description,
  }
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}


export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProjectDetails(params.slug);

  if (!project) {
    notFound();
  }

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
                {project.github && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.github} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                )}
              </div>
              {project.video && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg bg-muted">
                    <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full"
                    />
                </div>
              )}
              <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/80 mb-12">
                <p>{project.longDescription}</p>
              </div>
            </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
