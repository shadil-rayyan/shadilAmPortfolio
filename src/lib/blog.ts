import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags?: string[];
  image?: string;
  author: string;
}

export async function getAllPosts(): Promise<Omit<BlogPost, 'content'>[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  
  const posts = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        image: data.image || null,
        author: data.author || 'Shadil AM',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  let filePath = '';
  if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    content,
    tags: data.tags || [],
    image: data.image || null,
    author: data.author || 'Shadil AM',
  };
}
