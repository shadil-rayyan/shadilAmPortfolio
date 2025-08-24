import Link from "next/link";
import { Code, Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const resumeLink = "https://drive.google.com/file/d/1ffZrcMcn8UatXGIaautbbqpV7ADNhhhgggggaETA/view?usp=sharing";
  const githubLink = "https://github.com/Shadil-rayyan";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold">DevFolio</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center gap-2">
            <Button asChild>
                <Link href={resumeLink} target="_blank">Resume</Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href={githubLink} target="_blank">
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
                  <Code className="h-6 w-6 text-primary" />
                  <span>DevFolio</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 mt-4">
                    <Button asChild>
                        <Link href={resumeLink} target="_blank">Resume</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href={githubLink} target="_blank">
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
