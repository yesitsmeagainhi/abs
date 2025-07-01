import fs from 'fs/promises';
import path from 'path';

export async function loadHeaderData() {
  const filePath = path.join(process.cwd(), 'content/settings/header.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}
