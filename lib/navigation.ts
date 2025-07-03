/* --------------------------------------------------------------------------
   lib/navigation.ts              typed JSON import
   -------------------------------------------------------------------------- */
import navData from '../content/settings/navigation.json';

export interface NavItem {
  label: string;
  type: 'page' | 'post' | 'custom';
  page?: string;           // slug of a page in content/pages
  post?: string;           // slug of a post in content/posts
  url?: string;            // custom absolute or relative URL
  children?: NavItem[];    // nested menu
}

// Define the structure of the entire navigation data
export interface NavigationData {
  announcement: string;
  logo: string;
  cta: {
    label: string;
    url: string;
  };
  menu: NavItem[];
}

/** The whole navigation data object */
export const NAV_DATA = navData as NavigationData;

/** Just the menu items array */
export const NAVIGATION = NAV_DATA.menu;

/** Individual navigation components for easy access */
export const ANNOUNCEMENT = NAV_DATA.announcement;
export const LOGO = NAV_DATA.logo;
export const CTA_BUTTON = NAV_DATA.cta;