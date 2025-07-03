// pages/api/footer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/footer.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error loading footer:', error);
    res.status(500).json({ error: 'Failed to load footer data' });
  }
}
