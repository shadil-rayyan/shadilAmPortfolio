import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id: string;
}

export const Section = ({ children, className, id, ...props }: SectionProps) => {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
    return (
        <h2 className={cn("text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl text-primary", className)} {...props}>
            {children}
        </h2>
    )
}
