import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In a real app, you would fetch this data from a CMS or database
const allProjects = [
    {
      slug: "ecommerce-platform",
      title: "E-commerce Platform",
      description: "A full-featured e-commerce site built with Next.js, Stripe for payments, and a custom CMS for product management. This project involved creating a seamless shopping experience, from product discovery to checkout. The backend is powered by Node.js and manages inventory, orders, and customer data securely.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "online store checkout",
      link: "/projects/ecommerce-platform",
      tags: ["Next.js", "React", "Stripe", "Tailwind CSS", "Node.js"],
      category: "Web",
    },
    {
      slug: "data-visualization-dashboard",
      title: "Data Visualization Dashboard",
      description: "An interactive dashboard for visualizing complex datasets using D3.js and React, enabling real-time data exploration. It allows users to filter, sort, and drill down into data with various chart types. The architecture is designed for performance, handling large volumes of data efficiently.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "data dashboard charts",
      link: "/projects/data-visualization-dashboard",
      tags: ["React", "D3.js", "Node.js", "Express"],
      category: "Web",
    },
    {
      slug: "ai-content-generator",
      title: "AI-Powered Content Generator",
      description: "A web app that leverages generative AI to create marketing copy and blog posts, built with Python, Flask, and a React frontend. Users can specify a topic and tone, and the AI generates high-quality content. The project required fine-tuning a large language model for specific content styles.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "artificial intelligence writing",
      link: "/projects/ai-content-generator",
      tags: ["Python", "Flask", "React", "AI", "NLP"],
      category: "AI",
    },
    {
      slug: "mobile-fitness-app",
      title: "Mobile Fitness App",
      description: "A cross-platform mobile app for tracking workouts and nutrition, built with React Native and Firebase. Features include personalized workout plans, progress tracking, and social sharing. Firebase is used for real-time database updates and user authentication.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "mobile fitness tracker",
      link: "/projects/mobile-fitness-app",
      tags: ["React Native", "Firebase", "iOS", "Android"],
      category: "Mobile",
    },
    {
      slug: "project-management-tool",
      title: "Project Management Tool",
      description: "A collaborative tool for teams to manage tasks, projects, and deadlines, featuring a real-time Kanban board. Built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for live updates. It helps teams stay organized and improves productivity.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "kanban board software",
      link: "/projects/project-management-tool",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      category: "Web",
    },
    {
      slug: "iot-smart-home-system",
      title: "IoT Smart Home System",
      description: "A system to control smart home devices from a central dashboard, using Raspberry Pi, Node.js, and MQTT. This project allows users to automate lighting, temperature, and security. The dashboard provides a user-friendly interface to manage all connected devices.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "smart home dashboard",
      link: "/projects/iot-smart-home-system",
      tags: ["IoT", "Raspberry Pi", "Node.js", "MQTT"],
      category: "IoT",
    },
    {
      slug: "recipe-sharing-app",
      title: "Recipe Sharing App",
      description: "A social platform for users to share and discover new recipes, with features like meal planning and shopping lists. Built with Vue.js and Firebase, it offers a seamless and engaging user experience for food enthusiasts.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "food recipe website",
      link: "/projects/recipe-sharing-app",
      tags: ["Vue.js", "Firebase", "Vuetify"],
      category: "Web",
    },
    {
      slug: "ar-navigation-app",
      title: "AR Navigation App",
      description: "An augmented reality mobile app that overlays navigation directions onto the real world view from the phone's camera. Using ARKit for iOS, it provides an intuitive and futuristic way to navigate urban environments.",
      image: "https://placehold.co/1200x600.png",
      imageHint: "augmented reality navigation",
      link: "/projects/ar-navigation-app",
      tags: ["ARKit", "Swift", "CoreLocation"],
      category: "Mobile",
    },
  ];

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Project Not Found</h1>
                    <p className="mt-4 text-muted-foreground">
                        Sorry, we couldn't find the project you're looking for.
                    </p>
                    <Link href="/projects" className="mt-6 inline-block text-primary hover:underline">
                        Back to all projects
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>
            </div>
          <article className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-primary">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
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
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/80">
              <p>{project.description}</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
