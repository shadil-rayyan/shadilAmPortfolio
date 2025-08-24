import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  IconJavaScript,
  IconNextJs,
  IconNodeJs,
  IconReact,
  IconTailwind,
  IconTypeScript,
} from "@/components/icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const techStack = [
  { name: "JavaScript", icon: <IconJavaScript className="w-12 h-12" /> },
  { name: "TypeScript", icon: <IconTypeScript className="w-12 h-12" /> },
  { name: "React", icon: <IconReact className="w-12 h-12" /> },
  { name: "Next.js", icon: <IconNextJs className="w-12 h-12" /> },
  { name: "Node.js", icon: <IconNodeJs className="w-12 h-12" /> },
  { name: "Tailwind CSS", icon: <IconTailwind className="w-12 h-12" /> },
];

export function TechStackSection() {
  return (
    <Section id="tech-stack">
      <SectionTitle>My Tech Stack</SectionTitle>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12">
          <TooltipProvider>
            {techStack.map((tech) => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <div className="flex justify-center items-center p-4 bg-card rounded-full border-2 border-transparent hover:border-primary transition-all duration-300 cursor-pointer">
                    {tech.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tech.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </Section>
  );
}
