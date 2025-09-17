describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
  })
  describe("Navigation", () => {
    it("should navigate to the Sign In page", () => {
      // Visit the homepage
      cy.visit("/");
  
      // Click the Sign In button
      cy.contains("Sign In").click();
  
      // Verify that the URL changes (adjust path if needed)
      cy.url().should("include", "/sign-in");
  
      // Optionally check for content on the sign-in page
      cy.contains("Sign In").should("be.visible");
    });
  });
  
})