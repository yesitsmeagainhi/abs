import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const coursesDir = path.join(process.cwd(), 'content/courses');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(coursesDir)) {
        return res.status(200).json([]);
      }
      const files = fs.readdirSync(coursesDir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
      const courses = files.map((file) => {
        const raw = fs.readFileSync(path.join(coursesDir, file), 'utf-8');
        const { data } = matter(raw);
        return {
          file,
          slug: file.replace(/\.(mdx|md)$/, ''),
          title: data.title || '',
          domain: data.domain || '',
          tagline: data.tagline || '',
          heroImage: data.heroImage || '',
        };
      });
      return res.status(200).json(courses);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read courses' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { slug, frontmatter, content } = req.body;
      if (!slug) return res.status(400).json({ error: 'Slug is required' });

      const fileName = `${slug}.mdx`;
      const filePath = path.join(coursesDir, fileName);

      if (fs.existsSync(filePath)) {
        return res.status(409).json({ error: 'A course with this slug already exists' });
      }

      if (!fs.existsSync(coursesDir)) {
        fs.mkdirSync(coursesDir, { recursive: true });
      }

      const fileContent = matter.stringify(content || '', frontmatter || {});
      fs.writeFileSync(filePath, fileContent, 'utf-8');

      return res.status(201).json({ success: true, slug });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create course' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
