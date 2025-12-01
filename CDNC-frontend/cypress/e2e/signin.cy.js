// describe("Sign In Page", () => {
//   beforeEach(() => {
//     cy.visit("/sign-in");
//   });

//   it("shows validation errors when required fields are empty", () => {
//     cy.contains("Log In").click();

//     cy.get("#email").siblings("p").should("contain", "Email");
//     cy.get("#password").siblings("p").should("contain", "Password");
//   });

//   it("submits credentials and stores the session", () => {
//     cy.intercept("POST", "**/auth/login", {
//       statusCode: 200,
//       body: {
//         token: "jwt-token",
//         email: "test@example.com",
//         fullName: "Test User",
//       },
//     }).as("loginRequest");

//     cy.get("#email").type("test@example.com");
//     cy.get("#password").type("Password1");
//     cy.contains("Log In").click();

//     cy.wait("@loginRequest");
//     cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
//     cy.window().its("localStorage").invoke("getItem", "token").should("eq", "jwt-token");
//     cy.window().its("localStorage").invoke("getItem", "fullName").should("eq", "Test User");
//   });

//   it("links to the sign up flow", () => {
//     cy.contains("Create Account").click();
//     cy.url().should("include", "/sign-up");
//     cy.contains("Create Account").should("be.visible");
//     cy.get("#fullName").should("exist");
//   });
// });
