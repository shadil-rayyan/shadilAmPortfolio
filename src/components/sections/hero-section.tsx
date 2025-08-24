import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
              Hi, I'm a <span className="text-primary">Full-Stack Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              I specialize in building exceptional, high-quality websites and applications. Based in San Francisco, I'm passionate about creating modern, responsive, and user-friendly digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0">
             <Image
                src="https://placehold.co/600x600.png"
                alt="Portrait of a developer"
                width={600}
                height={600}
                className="rounded-full object-cover shadow-2xl aspect-square"
                data-ai-hint="professional portrait"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
