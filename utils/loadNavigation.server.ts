import fs from 'fs';
import path from 'path';
import { HeaderSettings } from '../types/navigation';

export const loadNavigation = (): HeaderSettings => {
  const filePath = path.join(process.cwd(), 'content', 'settings', 'navigation.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents);
};
