import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import fs from 'fs';
import path from 'path';
import { IncomingForm, File } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadsDir = path.join(process.cwd(), 'public/uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  try {
    const form = new IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const uploaded = files.file;
    if (!uploaded) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file: File = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    const originalName = file.originalFilename || 'upload';
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
    const finalName = `${baseName}-${Date.now()}${ext}`;
    const finalPath = path.join(uploadsDir, finalName);

    fs.renameSync(file.filepath, finalPath);

    return res.status(200).json({
      success: true,
      url: `/uploads/${finalName}`,
      filename: finalName,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
