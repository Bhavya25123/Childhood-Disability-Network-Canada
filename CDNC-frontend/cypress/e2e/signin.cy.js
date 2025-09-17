describe("Sign In Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/sign-in"); // adjust path if needed
      cy.url().should("include", "/sign-up"); 
    });
  
    it("should display the Sign In page correctly", () => {
      // Check page heading
      cy.contains("Welcome Back").should("be.visible");
  
      // Check subheading
      cy.contains("Sign in to access your caregiver resources and community").should("be.visible");
  
      // Check input fields
      cy.get('[data-lov-id="src/pages/SignIn.tsx:50:14"] > .block')
      cy.get('#email');
      cy.get('[data-lov-id="src/pages/SignIn.tsx:64:14"] > .block')
      cy.get('#password')
      // Check buttons/links
      cy.contains("Log In").should("be.visible");
     // cy.contains("Create Account").should("be.visible");
    });
  
    it("should allow entering email and password", () => {
      cy.get('#email').type("b@gmail.com");
      cy.get('#password').type("a");
  
      // Verify text entered
      cy.get('#email').should("have.value", "b@gmail.com");
      cy.get('#password').should("have.value", "a");
    });
  
    it("should click Log In button", () => {
      cy.get('#email').type("b@gmail.com");
      cy.get('#password').type("a");
  
      cy.contains("Log In").click();
     cy.visit("http://localhost:8080");
    });

  
     it("should navigate to Create Account page when clicked", () => {
        cy.get('.text-purple-600').click();
        cy.url().should("include", "/sign-up"); 

        cy.get('.text-purple-600')
        cy.get('[data-lov-id="src/pages/SignUp.tsx:55:14"] > .block')
        cy.get('#email')
        cy.get('#email').type("bh@gmail.com");
        cy.get('#email').should("have.value", "bh@gmail.com");

        cy.get('[data-lov-id="src/pages/SignUp.tsx:84:16"] > .block')
        cy.get('#city')
        cy.get('#city').type("Oakville");
        cy.get('#city').should("have.value", "Oakville");

     });
  });
  