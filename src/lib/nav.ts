export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/posts" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_RESOURCE_LINKS: NavLink[] = [
  { label: "Blog", href: "/posts" },
  { label: "Guides", href: "/posts" },
  { label: "FAQs", href: "/contact#faq" },
];
