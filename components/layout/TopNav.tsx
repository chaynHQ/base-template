import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { NavBar, type NavItem } from "./NavBar";

const logoLinkStyles =
  "flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:ring-offset-peach-tint";

/** Server Component — logo renders into SSR HTML; nav behaviour is client-side. */
export async function TopNav() {
  const t = await getTranslations("nav");

  const navItems: NavItem[] = [
    { type: "link", href: "/example", label: t("navExamplePage") },
    {
      type: "dropdown",
      id: "example-section",
      label: t("navExampleSection"),
      menuLabel: t("navExampleSectionMenuLabel"),
      items: [{ href: "/example/intro", label: t("navExampleIntro") }],
    },
  ];

  return (
    <NavBar
      navItems={navItems}
      cta={{
        href: "https://www.chayn.co",
        label: t("ctaLabel"),
        ariaLabel: t("ctaAriaLabel"),
      }}
      labels={{
        header: t("headerLabel"),
        nav: t("primaryNav"),
        openMenu: t("openMenu"),
        closeMenu: t("closeMenu"),
        changeLanguage: t("changeLanguage"),
        languageMenu: t("languageMenu"),
      }}
    >
      <Link href="/" aria-label={t("logoLabel")} className={logoLinkStyles}>
        <Image
          src="/chayn_logo.png"
          alt="Chayn"
          width={140}
          height={48}
          className="h-10 w-auto"
          priority
        />
        {/* Divider + label give this sub-site its own identity within the Chayn brand. 
        To enable this, uncomment the following lines and add siteLabel to translation files. */}
        {/* <span
          aria-hidden="true"
          className="hidden h-6 w-px bg-foreground/20 sm:block"
        />
        <span className="hidden text-base font-semibold text-foreground/80 sm:inline">
          {t("siteLabel")}
        </span> */}
      </Link>
    </NavBar>
  );
}
