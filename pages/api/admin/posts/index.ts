import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(postsDir)) {
        return res.status(200).json([]);
      }
      const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
      const posts = files.map((file) => {
        const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
        const { data } = matter(raw);
        return {
          file,
          slug: file.replace(/\.(mdx|md)$/, ''),
          title: data.title || '',
          date: data.date || '',
          category: data.category || '',
          summary: data.summary || '',
          hero: data.hero || '',
        };
      });
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read posts' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { slug, frontmatter, content } = req.body;
      if (!slug) return res.status(400).json({ error: 'Slug is required' });

      const fileName = `${slug}.md`;
      const filePath = path.join(postsDir, fileName);

      if (fs.existsSync(filePath)) {
        return res.status(409).json({ error: 'A post with this slug already exists' });
      }

      if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
      }

      const fileContent = matter.stringify(content || '', frontmatter || {});
      fs.writeFileSync(filePath, fileContent, 'utf-8');

      return res.status(201).json({ success: true, slug });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
