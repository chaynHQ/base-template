/**
 * Homepage content tests.
 *
 * Tests the actual rendered content of the default English route (`/`).
 * Grounded in what messages/en.json ("temp" namespace) currently defines —
 * update alongside copy changes.
 */
describe("Homepage content", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has the correct document title", () => {
    cy.title().should("eq", "Chayn");
  });

  it("renders a single h1 heading", () => {
    cy.get("h1")
      .should("have.length", 1)
      .and("contain.text", "Next.js Starter Template");
  });

  it("renders the intro paragraph", () => {
    cy.get("main").should(
      "contain.text",
      "A production-ready, multilingual foundation",
    );
  });

  it("renders the stack section", () => {
    cy.contains("h2", "What's included").should("be.visible");
    cy.contains("Next.js 16").should("be.visible");
    cy.contains("Tailwind CSS 4").should("be.visible");
  });

  it("renders the design system section", () => {
    cy.contains("h2", "Design system").should("be.visible");
    cy.contains("Colour palette").should("be.visible");
    cy.contains("Typography").should("be.visible");
    cy.contains("Components").should("be.visible");
  });

  it("renders the get started section with all three steps", () => {
    cy.contains("h2", "Get started").should("be.visible");
    cy.contains("Clone & install").should("be.visible");
    cy.contains("Configure environment").should("be.visible");
    cy.contains("Start the dev server").should("be.visible");
  });

  it("renders both customisation track cards", () => {
    cy.contains("Building within Chayn").should("be.visible");
    cy.contains("Forking for a new organisation").should("be.visible");
  });

  it("renders the GitHub CTA link", () => {
    cy.get('a[href="https://github.com/chaynHQ/base-template"]')
      .should("be.visible")
      .and("contain.text", "View on GitHub");
  });
});
