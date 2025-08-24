import Link from "next/link";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import heroData from "@/data/hero.json";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Shadil AM</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild>
                <Link href={heroData.resume} target="_blank">Resume</Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href={heroData.github} target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                </Link>
            </Button>
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <span>Shadil AM</span>
                </Link>
                <div className="flex flex-col gap-4 mt-4">
                    <Button asChild>
                        <Link href={heroData.resume} target="_blank">Resume</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href={heroData.github} target="_blank">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                        </Link>
                    </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
