import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface PostFile {
  meta: {
    title: string;
    author?: string;
    date?: string;
    hero?: string;
    summary?: string;
    category?: string;
    slug: string;
  };
  content: string; // raw markdown
  html: string;    // parsed HTML
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

// Configure marked renderer to disable header IDs
const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  return `<h${level}>${text}</h${level}>\n`;
};

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer: renderer,
});

export function getAllPosts(): PostFile[] {
  const files = fs.readdirSync(POSTS_DIR);
  const markdownFiles = files.filter((f) => f.endsWith(".md"));
  
  const posts: PostFile[] = markdownFiles.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const safeDate =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : typeof data.date === "string"
        ? data.date.slice(0, 10)
        : "";

    const post: PostFile = {
      meta: {
        title: data.title || "",
        author: data.author,
        date: safeDate,
        hero: data.hero,
        summary: data.summary,
        category: data.category,
        slug: file.replace(/\.md$/, ""),
      },
      content,
      html: marked.parse(content) as string,
    };

    return post;
  });

  return posts;
}