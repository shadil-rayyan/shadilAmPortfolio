"use client";

import { useState } from "react";
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
import { ArrowRight } from "lucide-react";

const projects = [
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce site built with Next.js, Stripe for payments, and a custom CMS for product management.",
    image: "https://placehold.co/600x400.png",
    imageHint: "online store",
    link: "/projects/ecommerce-platform",
    tags: ["Next.js", "React", "Stripe", "Tailwind CSS"],
    category: "Web",
  },
  {
    slug: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets using D3.js and React, enabling real-time data exploration.",
    image: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    link: "/projects/data-visualization-dashboard",
    tags: ["React", "D3.js", "Node.js", "Express"],
    category: "Web",
  },
  {
    slug: "ai-content-generator",
    title: "AI-Powered Content Generator",
    description: "A web app that leverages generative AI to create marketing copy and blog posts, built with Python, Flask, and a React frontend.",
    image: "https://placehold.co/600x400.png",
    imageHint: "artificial intelligence",
    link: "/projects/ai-content-generator",
    tags: ["Python", "Flask", "React", "AI"],
    category: "AI",
  },
  {
    slug: "mobile-fitness-app",
    title: "Mobile Fitness App",
    description: "A cross-platform mobile app for tracking workouts and nutrition, built with React Native and Firebase.",
    image: "https://placehold.co/600x400.png",
    imageHint: "fitness app",
    link: "/projects/mobile-fitness-app",
    tags: ["React Native", "Firebase", "iOS", "Android"],
    category: "Mobile",
  },
  {
    slug: "project-management-tool",
    title: "Project Management Tool",
    description: "A collaborative tool for teams to manage tasks, projects, and deadlines, featuring a real-time Kanban board.",
    image: "https://placehold.co/600x400.png",
    imageHint: "kanban board",
    link: "/projects/project-management-tool",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web",
  },
  {
    slug: "iot-smart-home-system",
    title: "IoT Smart Home System",
    description: "A system to control smart home devices from a central dashboard, using Raspberry Pi, Node.js, and MQTT.",
    image: "https://placehold.co/600x400.png",
    imageHint: "smart home",
    link: "/projects/iot-smart-home-system",
    tags: ["IoT", "Raspberry Pi", "Node.js", "MQTT"],
    category: "IoT",
  },
];

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.slice(0, 6).map((project) => (
          <Card key={project.slug} className="flex flex-col overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="p-0">
              <Link href={project.link} className="block relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover"
                  data-ai-hint={project.imageHint}
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="mb-2">
                <Link href={project.link}>{project.title}</Link>
              </CardTitle>
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
