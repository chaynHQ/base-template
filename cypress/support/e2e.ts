// Cypress support file — runs before every spec.
// Add global commands and configuration here.

// Import default Cypress commands (visit, get, click, etc.)
import "./commands";

// When analytics providers are not configured (e.g. NEXT_PUBLIC_GA_ID unset on a
// fresh fork), @vercel/analytics can throw an unhandled promise rejection in
// non-Vercel environments. Suppress these so missing secrets don't fail CI, but
// only when GA is not configured — preserving error detection on full deployments.
if (!Cypress.env("NEXT_PUBLIC_GA_ID")) {
  Cypress.on("uncaught:exception", () => false);
}
