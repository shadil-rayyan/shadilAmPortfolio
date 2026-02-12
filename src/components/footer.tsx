import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db/index";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  let footerData = {
    email: "test@example.com",
    github: "#",
    linkedin: "#"
  };

  try {
    const [footerSetting] = await db.select().from(settings).where(eq(settings.key, "footer")).limit(1);
    if (footerSetting) {
      footerData = JSON.parse(footerSetting.value);
    }
  } catch (error) {
    console.error("Failed to fetch footer settings:", error);
  }

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Shadil AM. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`mailto:${footerData.email}`} aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </Link>
          <Link href={footerData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href={footerData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
