export interface NavItem {
  label: string;
  type: 'custom' | 'page' | 'post';
  url?: string;
  page?: string;
  post?: string;
  children?: NavItem[];
  grandchildren?: NavItem[];
}

export interface CTA {
  label: string;
  url: string;
}

export interface HeaderSettings {
  announcement?: string;
  logo?: string;
  cta?: CTA;
  menu: NavItem[];
}
