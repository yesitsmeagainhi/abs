import { promises as fs } from 'fs';
import path from 'path';

export type NavLink = {
  label: string;
  url?: string;
  type?: 'custom' | 'page' | 'post';
  page?: string;
  post?: string;
  children?: NavLink[];
  grandchildren?: NavLink[];
};

export type HeaderData = {
  announcement?: string;
  logo?: string;
  cta?: { label: string; url: string };
  menu: NavLink[];
};

export async function loadNavigationDirect(): Promise<HeaderData> {
  const file = path.join(process.cwd(), 'content/settings/navigation.json');

  try {
    const raw = await fs.readFile(file, 'utf8');
    const json = JSON.parse(raw);

    // ---------- normalise ----------
    const normalised = (link: NavLink): NavLink => {
      // Use `page` / `post` slugs if chosen
      const url =
        link.type === 'page' ? `/${link.page ?? ''}` :
        link.type === 'post' ? `/blog/${link.post ?? ''}` :
        link.url ?? '#';

      return {
        ...link,
        url,
        children: link.children?.map(normalised),
        grandchildren: link.grandchildren?.map(normalised),
      };
    };

    return {
      announcement: json.announcement ?? '',
      logo:         json.logo        ?? '',
      cta:          json.cta         ?? undefined,
      menu:         (json.menu as NavLink[]).map(normalised),
    };
  } catch (e) {
    console.error('⚠️  loadNavigationDirect failed – header hidden', e);
    return { menu: [] };                       // safe fallback
  }
}