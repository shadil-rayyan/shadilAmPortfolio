export const dynamic = "force-dynamic";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { BackToTop } from "@/components/back-to-top";
import { CodeCompassSection } from "@/components/sections/code-compass-section";
import { db } from "@/lib/db/index";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  let contactData = {
      email: "test@example.com",
      description: "Available for new projects...",
      linkedin: "#"
  };

  try {
    const [contactSetting] = await db.select().from(settings).where(eq(settings.key, "contact")).limit(1);
    if (contactSetting) {
      contactData = JSON.parse(contactSetting.value);
    }
  } catch (error) {
    console.error("Failed to fetch contact settings:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ExperienceSection />
        <CodeCompassSection />
        <TechStackSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <EducationSection />
        <ContactSection data={contactData} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
