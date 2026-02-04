import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const metadata = {
  title: "Blog",
  description: "Technical articles and thoughts on software development.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Technical Blog</h1>
            <p className="text-muted-foreground text-lg">
              Sharing my journey, experiences, and technical insights.
            </p>
          </div>

          <div className="grid gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block transition-transform hover:scale-[1.01]">
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(post.date), "MMMM dd, yyyy")}
                        </div>
                        <div className="flex gap-2">
                          {post.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{post.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No posts found. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
