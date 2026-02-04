import { Section, SectionTitle } from "@/components/section-wrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";

export async function BlogSection() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section id="blog">
      <SectionTitle>Latest from Blog</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(post.date), "MMM dd, yyyy")}
                  </div>
                  <div className="flex gap-1">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog" className="flex items-center">
            View All Posts <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
