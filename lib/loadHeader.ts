// lib/loadHeader.ts
import fs from 'fs';
import path from 'path';

export async function loadHeaderData() {
  const filePath = path.join(process.cwd(), 'content/settings/header.json');
  const fileContents = fs.readFileSync(filePath, 'utf8'); // ✅ sync read for compatibility
  return JSON.parse(fileContents);
}
