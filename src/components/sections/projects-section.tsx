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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github } from "lucide-react";
import { db } from "@/lib/db/index";
import { projects } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function ProjectsSection() {
  let featuredProjects: any[] = [];
  try {
    featuredProjects = await db.select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(desc(projects.createdAt))
      .limit(3);
  } catch (error) {
    console.error("Failed to fetch projects data:", error);
  }

  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
            <Card key={project.id} className="project-card-border flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {project.video && (
                  <CardHeader className="p-0">
                    <Link href={`/projects/${project.slug}`} className="block relative h-48 w-full overflow-hidden bg-muted">
                        <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>
                  </CardHeader>
                )}
                <CardContent className="p-6 flex-grow">
                <CardTitle className="mb-2">
                    <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">{project.title}</Link>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags ? JSON.parse(project.tags).map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>) : null}
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
