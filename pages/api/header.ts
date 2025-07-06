// pages/api/header.ts
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/header.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContents);

    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load header data.' });
  }
}
