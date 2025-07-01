// pages/blog/[slug].tsx – MD → HTML blog renderer with TOC & headings in lists

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { marked } from 'marked';
import slugify from 'slugify';

import { getAllPosts } from '../../lib/md'; // helper that lists all posts

/* ——— Types ——— */
type TocItem = { id: string; text: string };

interface Post {
  meta: {
    title: string;
    author?: string;
    date?: string;
    hero?: string;
    summary?: string;
    slug: string;
  };
  html: string;
  toc: TocItem[];
  readTime: number;
}

/* ——— Markdown → HTML with TOC ——— */
function mdToHtml(markdown: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const renderer = new marked.Renderer();

  renderer.heading = (text: string, level: number): string => {
    const id = slugify(text, { lower: true, strict: true });

    if (level === 2 || level === 3) {
      toc.push({ id, text });
    }

    return `<h${level} id="${id}" class="scroll-mt-24">${text}</h${level}>`;
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer,
  });

  return { html: marked.parse(markdown) as string, toc };
}

/* ——— React Page ——— */
export default function BlogPost({ post }: { post: Post }) {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>{post.meta.title} | ABS Blog</title>
        {post.meta.summary && <meta name="description" content={post.meta.summary} />}
        {post.meta.hero && <meta property="og:image" content={post.meta.hero} />}
      </Head>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link> /{' '}
        <Link href="/blog" className="hover:underline">Blog</Link> /{' '}
        <span className="text-gray-700">{post.meta.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3">{post.meta.title}</h1>
      <p className="text-center text-gray-600 mb-10">
        By {post.meta.author ?? 'ABS Team'} on {post.meta.date} · {post.readTime} min read
      </p>

      {/* Hero image */}
      {post.meta.hero && (
        <Image
          src={post.meta.hero}
          alt={post.meta.title}
          width={900}
          height={540}
          priority
          className="rounded shadow mb-10 object-cover w-full h-auto"
        />
      )}

      {/* TOC */}
      {post.toc.length > 0 && (
        <div className="border rounded p-4 mb-8 bg-gray-50">
          <h2 className="font-semibold mb-2">Table of Contents</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {post.toc.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="text-blue-700 hover:underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Blog body */}
      <article
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}

/* ——— Static Paths ——— */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.meta.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

/* ——— Static Props ——— */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const { html, toc } = mdToHtml(content);
  const readTime = Math.max(2, Math.round(content.split(' ').length / 200));

  const meta = {
    ...data,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date ?? '',
    slug,
  };

  return {
    props: {
      post: {
        meta,
        html,
        toc,
        readTime,
      },
    },
  };
};