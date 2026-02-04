import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/github-dark.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="leading-7 mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: (props: any) => <li {...props} />,
  code: (props: any) => <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm" {...props} />,
  pre: (props: any) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <header className="mb-12">
            <div className="flex gap-2 mb-4">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              <span className="mx-2">•</span>
              <span>{format(new Date(post.date), "MMMM dd, yyyy")}</span>
            </div>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
              components={components}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
