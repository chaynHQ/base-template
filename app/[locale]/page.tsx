import { ArrowRightIcon, GitHubIcon } from "@/components/icons";
import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// Non-translatable palette data (CSS tokens + hex values).
// Colour names are translated via t('paletteNames.<key>').
const PALETTE = [
  { key: "red", bg: "bg-red", text: "text-cream", hex: "#f0244d" },
  { key: "peach", bg: "bg-peach", text: "text-foreground", hex: "#ffbfa3" },
  {
    key: "peachTint",
    bg: "bg-peach-tint",
    text: "text-foreground",
    hex: "#ffeae0",
  },
  {
    key: "cream",
    bg: "bg-cream border border-peach",
    text: "text-foreground",
    hex: "#fffbf5",
  },
  { key: "green", bg: "bg-green", text: "text-foreground", hex: "#d5e3d2" },
  { key: "lilac", bg: "bg-lilac", text: "text-foreground", hex: "#b5bfe8" },
  {
    key: "lilacTint",
    bg: "bg-lilac-tint",
    text: "text-foreground",
    hex: "#e1e6fc",
  },
  { key: "olive", bg: "bg-olive", text: "text-foreground", hex: "#d7cd97" },
  { key: "blue", bg: "bg-blue", text: "text-cream", hex: "#2899d5" },
  { key: "pink", bg: "bg-pink", text: "text-foreground", hex: "#f4d6d8" },
  { key: "yellow", bg: "bg-yellow", text: "text-foreground", hex: "#fecb37" },
] as const;

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-xs">
      {children}
    </code>
  );
}

function ChecklistItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground/80">
      <ArrowRightIcon
        className="mt-0.5 shrink-0 text-red"
        width={14}
        height={14}
      />
      <span>{children}</span>
    </li>
  );
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("temp");

  // Pull structured data out of the message catalogue so all copy
  // lives in one place and is easy to find when forking this template.
  const stackItems = t.raw("stackItems") as Array<{
    label: string;
    desc: string;
  }>;
  const paletteNames = t.raw("paletteNames") as Record<string, string>;

  // Shared rich-text renderer for inline <code> spans in checklist items.
  const richCode = (chunks: ReactNode) => <Code>{chunks}</Code>;

  return (
    <main id="main-content" className="pt-[72px]">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-peach-tint px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-red">{t("eyebrow")}</p>
          <h1 className="mt-4 text-4xl leading-tight tracking-tight text-foreground">
            {t("heading")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
            {t("intro")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/chaynHQ/base-template"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("githubCtaAriaLabel")}
              className="btn-pill inline-flex items-center gap-2 bg-foreground text-cream hover:bg-foreground/85"
            >
              <GitHubIcon width={16} height={16} />
              {t("githubCta")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Stack ─────────────────────────────────────────────────── */}
      <section aria-labelledby="stack-heading" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2
            id="stack-heading"
            className="text-2xl tracking-tight text-foreground"
          >
            {t("stackHeading")}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stackItems.map(({ label, desc }) => (
              <li key={label} className="card-bordered bg-background p-5">
                <p className="font-semibold text-foreground">{label}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Design system ─────────────────────────────────────────── */}
      <section
        aria-labelledby="design-heading"
        className="bg-background px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="design-heading"
            className="text-2xl tracking-tight text-foreground"
          >
            {t("designHeading")}
          </h2>

          {/* Colour palette */}
          <div className="mt-10">
            <h3 className="mb-6 text-sm font-semibold text-foreground/80">
              {t("paletteHeading")}
            </h3>
            <ul
              className="flex flex-wrap gap-3"
              aria-label={t("paletteHeading")}
            >
              {PALETTE.map(({ key, bg, text, hex }) => (
                <li key={hex}>
                  <div
                    className={
                      "flex h-20 w-28 flex-col justify-end rounded-xl p-2.5 " +
                      bg
                    }
                  >
                    <p className={"text-xs font-medium leading-none " + text}>
                      {paletteNames[key]}
                    </p>
                    <p
                      className={
                        "mt-0.5 font-mono text-[10px] leading-none opacity-80 " +
                        text
                      }
                    >
                      {hex}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Typography */}
          <div className="mt-14">
            <h3 className="mb-6 text-sm font-semibold text-foreground/80">
              {t("typographyHeading")}
            </h3>
            <div className="card-bordered space-y-8 bg-white p-8">
              <div>
                <p className="mb-3 font-mono text-xs text-foreground/80">
                  {t("typographyFontSerif")}
                </p>
                <p className="text-4xl leading-tight">
                  {t("typographyH1Example")}
                </p>
                <p className="mt-2 text-2xl leading-snug">
                  {t("typographyH2Example")}
                </p>
                <p className="mt-2 text-xl">{t("typographyH3Example")}</p>
                <p className="mt-2 text-lg">{t("typographyH4Example")}</p>
              </div>
              <div>
                <p className="mb-3 font-mono text-xs text-foreground/80">
                  {t("typographyFontSans")}
                </p>
                <p className="font-sans text-base leading-relaxed text-foreground/80">
                  {t("typographyBodyExample")}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/80">
                  {t("typographySmallExample")}
                </p>
              </div>
            </div>
          </div>

          {/* Components */}
          <div className="mt-14">
            <h3 className="mb-6 text-sm font-semibold text-foreground/80">
              {t("componentsHeading")}
            </h3>
            <div className="card-bordered space-y-8 bg-white p-8">
              <div>
                <p className="mb-4 font-mono text-xs text-foreground/80">
                  {t("componentsBtnPillLabel")}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="btn-pill bg-red text-cream hover:bg-red/85"
                  >
                    {t("componentsBtnPrimary")}
                  </button>
                  <button
                    type="button"
                    className="btn-pill bg-peach text-foreground hover:bg-peach/75"
                  >
                    {t("componentsBtnSecondary")}
                  </button>
                  <button
                    type="button"
                    className="btn-pill border border-peach bg-background text-foreground hover:bg-peach-tint"
                  >
                    {t("componentsBtnOutline")}
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-4 font-mono text-xs text-foreground/80">
                  {t("componentsCardBorderedLabel")}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="card-bordered bg-peach-tint p-5">
                    <p className="font-semibold text-foreground">
                      {t("componentsCardTintedHeading")}
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">
                      {t("componentsCardTintedDesc")}
                    </p>
                  </div>
                  <div className="card-bordered bg-white p-5">
                    <p className="font-semibold text-foreground">
                      {t("componentsCardWhiteHeading")}
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">
                      {t("componentsCardWhiteDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Get started ───────────────────────────────────────────── */}
      <section
        aria-labelledby="start-heading"
        className="bg-peach-tint px-6 py-20"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="start-heading"
            className="text-2xl tracking-tight text-foreground"
          >
            {t("startHeading")}
          </h2>
          <p className="mt-3 text-foreground/80">{t("startIntro")}</p>

          {/* Shared setup steps */}
          <ol className="mt-10 space-y-10" aria-label={t("startHeading")}>
            <li className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red text-sm font-semibold text-cream"
              >
                1
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                  {t("step1Heading")}
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {t("step1Desc")}
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-foreground/5 px-5 py-4 font-mono text-sm leading-relaxed text-foreground/80">
                  <code>{t("step1Code")}</code>
                </pre>
              </div>
            </li>

            <li className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red text-sm font-semibold text-cream"
              >
                2
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                  {t("step2Heading")}
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {t("step2Desc")}
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-foreground/5 px-5 py-4 font-mono text-sm leading-relaxed text-foreground/80">
                  <code>{t("step2Code")}</code>
                </pre>
              </div>
            </li>

            <li className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red text-sm font-semibold text-cream"
              >
                3
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                  {t("step3Heading")}
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {t.rich("step3Desc", {
                    link: (chunks) => (
                      <a
                        href="http://localhost:3000"
                        className="underline underline-offset-2 hover:text-foreground focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-foreground/5 px-5 py-4 font-mono text-sm leading-relaxed text-foreground/80">
                  <code>{t("step3Code")}</code>
                </pre>
              </div>
            </li>
          </ol>

          {/* Two-track customisation */}
          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Chayn projects */}
            <div className="card-bordered bg-white p-6">
              <p className="font-semibold text-foreground">
                {t("chaynTrackHeading")}
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                {t("chaynTrackDesc")}
              </p>
              <ul className="mt-5 space-y-3">
                <ChecklistItem>
                  {t.rich("chaynCheck1", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("chaynCheck2", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("chaynCheck3", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("chaynCheck4", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("chaynCheck5", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("chaynCheck6", { code: richCode })}
                </ChecklistItem>
              </ul>
            </div>

            {/* External organisations */}
            <div className="card-bordered bg-white p-6">
              <p className="font-semibold text-foreground">
                {t("externalTrackHeading")}
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                {t("externalTrackDesc")}
              </p>
              <ul className="mt-5 space-y-3">
                <ChecklistItem>{t("externalCheck1")}</ChecklistItem>
                <ChecklistItem>
                  {t.rich("externalCheck2", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("externalCheck3", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("externalCheck4", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("externalCheck5", { code: richCode })}
                </ChecklistItem>
                <ChecklistItem>
                  {t.rich("externalCheck6", { code: richCode })}
                </ChecklistItem>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
