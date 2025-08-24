'use client';

import { Section, SectionTitle } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CodeCompassSection() {
  return (
    <Section id="code-compass">
      <SectionTitle>My GitHub Organization</SectionTitle>
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3 items-center">
            <div className="md:col-span-1 p-6 flex justify-center">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4E0BAQH6G7qM_kXtQw/company-logo_100_100/B4EZY4bplgG0AU-/0/1744703495192/codecompassindiawebsite_logo?e=1758758400&v=beta&t=UipvCiXQ4ZXNy-1iKibSGburcGIAusnzvTJrBHlgZfc"
                alt="CodeCompass Logo"
                width={150}
                height={150}
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="md:col-span-2 p-6">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl mb-2">CodeCompass</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  CodeCompass is a vibrant community dedicated to fostering innovation and collaboration among developers. We create open-source projects and provide resources to help students learn, grow, and contribute to the tech world.
                </p>
                <Button asChild>
                  <Link href="https://github.com/CodeCompasss" target="_blank" rel="noopener noreferrer">
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
