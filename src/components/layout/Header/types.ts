export interface NavigationItem {
  title: string;
  href?: string;
  subcategories?: NavigationSubcategory[];
}

export interface NavigationSubcategory {
  title: string;
  items: NavigationComponentItem[];
}

export interface NavigationComponentItem {
  title: string;
  href: string;
}

export interface MarketingHeaderProps {
  className?: string;
}