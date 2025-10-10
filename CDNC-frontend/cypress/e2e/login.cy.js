describe("Home navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the hero slideshow", () => {
    cy.contains("Supporting Families").should("be.visible");
    cy.contains("Empowering caregivers with resources and community").should("be.visible");
  });

  it("navigates to the Sign In page from the header", () => {
    cy.contains("Sign In").click();
    cy.url().should("include", "/sign-in");
    cy.contains("Welcome Back").should("be.visible");
  });
});
