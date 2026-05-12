import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'content/settings/homepage.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(200).json({});
      }
      const raw = fs.readFileSync(filePath, 'utf-8');
      return res.status(200).json(JSON.parse(raw));
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read homepage data' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save homepage data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
