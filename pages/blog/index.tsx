// pages/blog/index.tsx – blog list

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { getAllPosts, PostFile } from "../../lib/md";

interface Props {
  posts: PostFile[];
  categories: string[];
}

export default function BlogIndex({ posts, categories }: Props) {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "old">("new");

  // 🔍 Filtered + sorted list
  const list = useMemo(() => {
    let arr = [...posts];
    if (cat !== "All") arr = arr.filter((p) => p.meta.category === cat);
    if (query) {
      arr = arr.filter((p) =>
        p.meta.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    arr.sort((a, b) =>
      sort === "new"
        ? (a.meta.date || "") < (b.meta.date || "")
          ? 1
          : -1
        : (a.meta.date || "") > (b.meta.date || "")
        ? 1
        : -1
    );
    return arr;
  }, [posts, cat, query, sort]);

  const [featured, ...others] = list;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Blog
        </nav>

        <h1 className="text-4xl font-extrabold text-center mb-2">Our Blogs</h1>
        <p className="text-center text-gray-600 mb-6">
          Check out our awesome blogs written by students, faculty and the ABS
          Team
        </p>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                  c === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Featured post */}
      {featured && (
        <section className="bg-gradient-to-r from-blue-50/40 to-transparent py-10">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <Image
              src={featured.meta.hero || "/placeholder.jpg"}
              alt={featured.meta.title}
              width={600}
              height={380}
              className="rounded shadow object-cover w-full"
              priority
            />
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                {featured.meta.title}
              </h2>
              {featured.meta.summary && (
                <p className="text-gray-700 mb-4 line-clamp-4">
                  {featured.meta.summary}
                </p>
              )}
              <Link
                href={`/blog/${featured.meta.slug}`}
                className="text-blue-700 font-medium"
              >
                Read More →
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Author: {featured.meta.author || "ABS Team"} |{" "}
                {featured.meta.date || "No date"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Grid of posts */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          {/* Filter + Search bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h3 className="text-2xl font-semibold">Check Out Our Other Blogs</h3>
            <input
              className="ml-auto border px-3 py-1 rounded"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "new" | "old")}
              className="border px-3 py-1 rounded"
            >
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {others.map((p) => (
              <article
                key={p.meta.slug}
                className="border rounded-lg shadow hover:shadow-md transition overflow-hidden"
              >
                <Link href={`/blog/${p.meta.slug}`}>
                  <Image
                    src={p.meta.hero || "/placeholder.jpg"}
                    alt={p.meta.title}
                    width={400}
                    height={260}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4 space-y-2">
                  <Link
                    href={`/blog/${p.meta.slug}`}
                    className="font-semibold text-lg"
                  >
                    {p.meta.title}
                  </Link>
                  {p.meta.summary && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {p.meta.summary}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    {p.meta.date || "No date"} ·{" "}
                    {Math.max(2, Math.round(p.content.split(" ").length / 200))}{" "}
                    mins read
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/* ---------- Static Props ---------- */
export const getStaticProps: GetStaticProps = async () => {
  const rawPosts = getAllPosts();

  // 🔧 FIX: Sanitize posts to convert undefined values to null
  const posts = rawPosts.map((post) => ({
    ...post,
    meta: {
      ...post.meta,
      title: post.meta.title || "Untitled",
      author: post.meta.author || null,        // ✅ null instead of undefined
      date: post.meta.date || null,            // ✅ null instead of undefined
      hero: post.meta.hero || null,            // ✅ null instead of undefined
      summary: post.meta.summary || null,      // ✅ null instead of undefined
      category: post.meta.category || null,    // ✅ null instead of undefined
      slug: post.meta.slug || "",
    },
  }));

  const categories = [
    ...new Set(posts.map((p) => p.meta.category).filter(Boolean)),
  ] as string[];

  return {
    props: {
      posts,
      categories,
    },
  };
};