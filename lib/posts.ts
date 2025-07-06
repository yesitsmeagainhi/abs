/* lib/posts.ts --------------------------------------------------------- */
/* Helper functions for blog posts.                                      */

import fs   from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type PostFront = {
  title: string;
  date:  string;          // ISO yyyy-mm-dd
  author?: string;
  category?: string;
  hero?: string;
  draft?: boolean;
  readTime?: string;
  [key: string]: any;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/* Return every markdown / mdx file in /content/posts ------------------- */
export async function getPostFileNames () {
  const all = await fs.readdir(POSTS_DIR);
  return all.filter(f => /\.(mdx?|markdown)$/.test(f));
}

/* Slug = file-name WITHOUT extension and WITHOUT leading date ----------
   2025-06-06-dpharma-blog.mdx  →  dpharma-blog                        */
export function fileNameToSlug (file: string) {
  const { name } = path.parse(file);
  return name.replace(/^\d{4}-\d{2}-\d{2}-/, "");      // drop "yyyy-mm-dd-"
}

/* Read *one* post ------------------------------------------------------ */
export async function getPost (slug: string) {
  const files     = await getPostFileNames();
  const fileMatch = files.find(f => fileNameToSlug(f) === slug);
  if (!fileMatch) return null;

  const raw     = await fs.readFile(path.join(POSTS_DIR, fileMatch), "utf-8");
  const parsed  = matter(raw);

  // Safely construct PostFront with required fields and defaults
  const front: PostFront = {
    title: parsed.data.title || "Untitled",
    date: parsed.data.date || "",
    author: parsed.data.author,
    category: parsed.data.category,
    hero: parsed.data.hero,
    draft: parsed.data.draft,
    readTime: parsed.data.readTime,
    // Spread any additional properties
    ...parsed.data
  };

  return { front, content: parsed.content };
}

/* All slugs (for getStaticPaths) -------------------------------------- */
export async function getAllSlugs () {
  const files = await getPostFileNames();
  return files.map(fileNameToSlug);
}