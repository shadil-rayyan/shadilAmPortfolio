'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ArrowRight} from 'lucide-react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/lib/firebase';
import {Skeleton} from '@/components/ui/skeleton';

interface HeroData {
  headline: string;
  description: string;
  image: string;
}

const fallbackData: HeroData = {
    headline: "Full-Stack Developer",
    description: "I build fast, responsive, and user-friendly web applications. Let's create something amazing together.",
    image: "https://placehold.co/600x600.png"
}

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data() as HeroData);
        } else {
          setHeroData(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        setHeroData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-36" />
                  <Skeleton className="h-12 w-36" />
                </div>
              </>
            ) : heroData ? (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
                  {heroData.headline}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {heroData.description}
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
              </>
            ) : (
               <p>Hero content could not be loaded.</p>
            )}
          </div>
          <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0">
            {isLoading ? (
               <Skeleton className="rounded-full w-[384px] h-[384px]" />
            ) : heroData?.image ? (
              <Image
                src={heroData.image}
                alt="Portrait of the developer"
                width={600}
                height={600}
                className="rounded-full object-cover shadow-2xl aspect-square"
                data-ai-hint="professional portrait"
                priority
              />
            ) : (
              <div className="w-[384px] h-[384px] bg-muted rounded-full flex items-center justify-center">
                <p>No Image</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
