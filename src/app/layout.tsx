import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import GoogleAnalytics from "@/components/GoogleAnalytics";

const title = 'Shadil AM - Full Stack Developer';
const description =
  'The personal portfolio of Shadil AM, a passionate Full Stack Developer, Software Engineer, and Data Science enthusiast showcasing projects, skills, and professional experience.';
const url = 'https://shadil-rayyan.github.io/shadil-portfolio';


export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | Shadil AM`,
  },
  description,
  keywords: [
    'Shadil AM',
    'Full Stack Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'Node.js',
    'Data Science',
    'Portfolio',
  ],
  authors: [{ name: 'Shadil AM', url }],
  creator: 'Shadil AM',
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@shadil_rayyan',
    images: [`${url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

      </head>

      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
