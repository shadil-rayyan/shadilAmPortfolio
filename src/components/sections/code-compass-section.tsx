import { Section, SectionTitle } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db/index';
import { settings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function CodeCompassSection() {
  let codeData = {
      title: "CodeCompass",
      description: "CodeCompass is a vibrant community...",
      github: "https://github.com/CodeCompasss",
      image: "./codecompass.png"
  };

  try {
    const [codeSetting] = await db.select().from(settings).where(eq(settings.key, "code_compass")).limit(1);
    if (codeSetting) {
      codeData = JSON.parse(codeSetting.value);
    }
  } catch (error) {
    console.error("Failed to fetch code compass settings:", error);
  }

  return (
    <Section id="code-compass">
      <SectionTitle>My GitHub Organization</SectionTitle>
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3 items-center">
            <div className="md:col-span-1 p-6 flex justify-center">
              <Image
                src={codeData.image}
                alt={`${codeData.title} Logo`}
                width={150}
                height={150}
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="md:col-span-2 p-6">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl mb-2">{codeData.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  {codeData.description}
                </p>
                <Button asChild>
                  <Link href={codeData.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Visit on GitHub
                  </Link>
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
