/* pages/[slug].tsx - FIXED VERSION with better debugging */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

import RenderBlocks from "../components/RenderBlocks";
// Removed unused Block import

/* ───────────── types ───────────── */
type Front = {
  title: string;
  ptype: "builder" | "markdown" | "code";
  blocks?: any[] | null;
  code?: string | null; // 👈 Allow null values
};

type Props = {
  front: Front;
  mdx?: MDXRemoteSerializeResult;
  raw?: string;
};

/* ───────────── React page with DEBUG ───────────── */
export default function Page({ front, mdx, raw }: Props) {
  // 🔍 DEBUG: Log what we're receiving
  console.log('Page Data:', { front, raw: raw?.substring(0, 100) });

  return (
    <>
      <Head>
        <title>{front.title} | ABS Edu</title>
      </Head>

      {/* ——— Visual-builder page ——— */}
      {front.ptype === "builder" && front.blocks && (
        <RenderBlocks blocks={front.blocks} />
      )}

      {/* ——— Markdown page ——— */}
      {front.ptype === "markdown" && mdx && (
        <article className="prose lg:prose-lg mx-auto py-12">
          <MDXRemote {...mdx} />
        </article>
      )}

      {/* ——— Raw-code page (IMPROVED) ——— */}
      {front.ptype === "code" && (
        <div>
          {/* Try multiple sources for the raw content */}
          {raw && raw.trim() && (
            <div dangerouslySetInnerHTML={{ __html: raw }} />
          )}
          {!raw && front.code && (
            <div dangerouslySetInnerHTML={{ __html: front.code }} />
          )}
          {!raw && !front.code && (
            <div className="p-8 text-center">
              <h2>No content found</h2>
              <p>Raw content is empty. Check your CMS configuration.</p>
              <details className="mt-4 text-left">
                <summary>Debug Info</summary>
                <pre className="bg-gray-100 p-4 mt-2 text-xs overflow-auto">
                  {JSON.stringify({ front, raw }, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ─────────────  IMPROVED getStaticProps with debugging  ───────────── */
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params!.slug as string;
  
  try {
    const source = await fs.readFile(
      path.join(process.cwd(), "content/pages", `${slug}.md`),
      "utf8"
    );

    const { content, data } = matter(source);

    // Ensure data has the required structure and fix undefined values
    const front: Front = {
      title: data.title || "Untitled",
      ptype: data.ptype || "markdown",
      blocks: data.blocks || null,
      code: data.code || null,  // ✅ Convert undefined to null
    };

    // 🔍 DEBUG: Log what we parsed
    console.log(`\n=== DEBUG: ${slug} ===`);
    console.log('Frontmatter:', front);
    console.log('Content length:', content.length);
    console.log('Content preview:', content.substring(0, 200));
    console.log('===================\n');

    /* ① Raw-code page */
    if (front.ptype === "code") {
      // Try multiple ways to get the content
      const rawContent = content || front.code || '';
      
      return { 
        props: { 
          front, 
          raw: rawContent.trim() 
        } 
      };
    }

    /* ② Markdown page */
    if (front.ptype === "markdown") {
      const mdx = await serialize(content, {
        mdxOptions: { remarkPlugins: [remarkGfm] },
        scope: front,
      });
      return { props: { front, mdx } };
    }

    /* ③ Builder page */
    return { props: { front: { ...front, blocks: front.blocks || null } } };

  } catch (error) {
    console.error(`Error loading page ${slug}:`, error);
    
    // Return a fallback page with error info
    return {
      props: {
        front: {
          title: "Error Loading Page",
          ptype: "code" as const,
          blocks: null,  // ✅ Add missing properties with null values
          code: null,    // ✅ Add missing properties with null values
        },
        raw: `
          <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
            <h1>Page Load Error</h1>
            <p>Could not load page: ${slug}</p>
            <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        `
      }
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const files = await fs.readdir(path.join(process.cwd(), "content/pages"));
    return {
      paths: files
        .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
        .map((f) => ({
          params: { slug: path.parse(f).name },
        })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error('Error reading pages directory:', error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};