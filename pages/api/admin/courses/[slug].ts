import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const coursesDir = path.join(process.cwd(), 'content/courses');

function findFile(slug: string): string | null {
  for (const ext of ['.mdx', '.md']) {
    const filePath = path.join(coursesDir, slug + ext);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { slug } = req.query;
  if (typeof slug !== 'string') return res.status(400).json({ error: 'Invalid slug' });

  if (req.method === 'GET') {
    const filePath = findFile(slug);
    if (!filePath) return res.status(404).json({ error: 'Course not found' });

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return res.status(200).json({ frontmatter: data, content, slug });
  }

  if (req.method === 'PUT') {
    const filePath = findFile(slug);
    if (!filePath) return res.status(404).json({ error: 'Course not found' });

    const { frontmatter, content } = req.body;
    const fileContent = matter.stringify(content || '', frontmatter || {});
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const filePath = findFile(slug);
    if (!filePath) return res.status(404).json({ error: 'Course not found' });

    fs.unlinkSync(filePath);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
