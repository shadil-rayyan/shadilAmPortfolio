import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { TypewriterWrapper } from '@/components/typewriter-wrapper';
import { db } from '@/lib/db/index';
import { settings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function HeroSection() {
  let heroData = {
    name: "SHADIL AM",
    roles: ["Backend Developer", "Software Development"],
    description: "I am a motivated and versatile individual...",
    image: "./shadil.jpeg",
  };
  let footerData: any = {};

  try {
    const [heroSetting] = await db.select().from(settings).where(eq(settings.key, "hero")).limit(1);
    const [footerSetting] = await db.select().from(settings).where(eq(settings.key, "footer")).limit(1);
    
    if (heroSetting) {
      heroData = JSON.parse(heroSetting.value);
    }
    if (footerSetting) {
      footerData = JSON.parse(footerSetting.value);
    }
  } catch (error) {
    console.error("Failed to fetch hero/footer settings:", error);
  }

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
              Hi, I'm {heroData.name}
            </h1>
            <div className="text-2xl md:text-3xl text-primary font-semibold h-10">
              <TypewriterWrapper words={heroData.roles} />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground">
              {heroData.description}
            </p>
            <div className="flex flex-col gap-4">
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
                <div className="flex items-center justify-start gap-4 mt-2">
                    <Link href={footerData.github || "#"} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-6 h-6" />
                    </Link>
                    <Link href={footerData.linkedin || "#"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </Link>
                </div>
            </div>
          </div>
          <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0">
            <Image
              src={heroData.image}
              alt={`Portrait of ${heroData.name}`}
              width={600}
              height={600}
              className="rounded-full object-cover shadow-2xl aspect-square"
              data-ai-hint="professional portrait"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
