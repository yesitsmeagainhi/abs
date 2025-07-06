// lib/settings.ts
import fs from 'fs';
import path from 'path';

export interface AnalyticsSettings {
  headerScripts?: string;
  bodyStartScripts?: string;
  footerScripts?: string;
}

export function getAnalytics(): AnalyticsSettings {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'content/settings.json'),
    'utf8'
  );
  return JSON.parse(raw);
}
