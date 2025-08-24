'use client';

import {
  Code,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Palette,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/use-auth';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navLinks: {
  href: string;
  label: string;
  icon: LucideIcon;
}[] = [
  {href: '/admin', label: 'Dashboard', icon: LayoutDashboard},
  {href: '/admin/hero', label: 'Hero', icon: Sparkles},
  {href: '/admin/education', label: 'Education', icon: GraduationCap},
  {href: '/admin/skills', label: 'Skills', icon: Code},
  {href: '/admin/projects', label: 'Projects', icon: Palette},
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {auth} = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="hidden w-16 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Code className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">DevFolio</span>
        </Link>
        <TooltipProvider>
          {navLinks.map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    pathname === link.href && 'bg-accent text-accent-foreground'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
