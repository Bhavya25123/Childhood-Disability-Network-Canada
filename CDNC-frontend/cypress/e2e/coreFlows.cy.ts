/// <reference types="cypress" />

describe('Core caregiver flows', () => {
  describe('Join Community enrollment', () => {
    beforeEach(() => {
      cy.visit('/join-community');
    });

    it('submits an enrollment request and confirms success', () => {
      cy.intercept('POST', '**/members', (req) => {
        expect(req.body).to.deep.equal({
          name: 'Alex Caregiver',
          email: 'alex@example.com',
          role: 'family',
          agreeToTerms: true,
        });

        req.reply({
          statusCode: 201,
          body: {
            message: "You're in!",
            memberId: 'mem_123',
          },
        });
      }).as('createMember');

      cy.get('#name').type(' Alex Caregiver ');
      cy.get('#email').type(' alex@example.com ');
      cy.get('#role').select('Family Caregiver');
      cy.get('#agreeToTerms').check();

      cy.contains('button', 'Join Community').click();

      cy.wait('@createMember');
      cy.contains("You're in!").should('be.visible');
      cy.contains('Thank you for joining our community').should('be.visible');

      cy.get('#name').should('have.value', '');
      cy.get('#email').should('have.value', '');
      cy.get('#role').should('have.value', '');
      cy.get('#agreeToTerms').should('not.be.checked');
    });

    it('surfaces duplicate enrollment errors from the API', () => {
      cy.intercept('POST', '**/members', {
        statusCode: 409,
        body: {
          error: 'This email is already part of the community.',
        },
      }).as('createMember');

      cy.get('#name').type('Taylor Advocate');
      cy.get('#email').type('taylor@example.com');
      cy.get('#role').select('Professional Caregiver');
      cy.get('#agreeToTerms').check();

      cy.contains('button', 'Join Community').click();

      cy.wait('@createMember');
      cy.contains('Already enrolled').should('be.visible');
      cy.get('#email-error')
        .should('be.visible')
        .and('contain', 'This email is already part of the community.');
    });
  });

  describe('Find Support directory', () => {
    beforeEach(() => {
      cy.visit('/find-support');
    });

    it('displays the featured services grid with contact information', () => {
      cy.contains('h1', 'Find Support').should('be.visible');
      cy.contains('button', 'Get Immediate Help').should('be.visible');

      cy.get('[role="article"]').as('serviceCards').should('have.length', 6);
      cy.get('@serviceCards').first().within(() => {
        cy.contains('Ontario Special Needs Helpline').should('be.visible');
        cy.contains('1-888-444-4626').should('be.visible');
      });

      cy.get('@serviceCards').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('h3').should('exist');
          cy.get('div').last().invoke('text').should('match', /\d/);
        });
      });
    });

    it('keeps the support ticker accessible to screen readers', () => {
      cy.contains('Ontario Autism Program Support Line').should('be.visible');
      cy.get('button[aria-label^="Announcement"]').its('length').should('be.gte', 2);
      cy.get('button[aria-label="Announcement 1"]').focus().should('have.focus');
    });
  });

  describe('Send a letter to local representatives', () => {
    beforeEach(() => {
      cy.visit('/send-letter');
    });

    it('validates input, generates a tailored draft, and supports copy/send actions', () => {
      cy.contains('button', 'Search').click();
      cy.contains('City or constituency is required.').should('be.visible');

      cy.intercept('GET', '**/mps*', {
        statusCode: 200,
        body: [
          {
            id: 'mp-1',
            name: 'Jordan Rivers',
            party: 'Independent',
            constituency: 'Toronto Centre',
            province: 'Ontario',
            email: 'jordan.rivers@parl.gc.ca',
          },
          {
            id: 'mp-2',
            name: 'Casey Lake',
            party: 'Community First',
            constituency: 'Ottawa West',
            province: 'Ontario',
            email: 'casey.lake@parl.gc.ca',
          },
        ],
      }).as('fetchMps');

      cy.get('input[placeholder*="Enter city"]').type('Toronto Centre');
      cy.contains('button', 'Search').click();
      cy.wait('@fetchMps');

      cy.contains('Select Your Representative').should('be.visible');
      cy.contains('Jordan Rivers').click();

      const letterForm = () =>
        cy.contains('h2', 'Craft your letter').parent().find('form');

      letterForm().within(() => {
        cy.get('input#name').type('Alex Advocate');
        cy.get('input#email').type('alex.advocate@example.com');
        cy.get('input#postalCode').type('K1A 0B1');
        cy.get('textarea#customMessage').type(
          'My family relies on respite programs that are currently underfunded.'
        );
        cy.contains('button', 'Generate letter').click();
      });

      cy.contains('Letter draft ready').should('be.visible');

      const draft = cy
        .contains('Editable letter draft')
        .parent()
        .find('textarea');

      draft.invoke('val').should('contain', 'Dear Jordan Rivers');
      draft.invoke('val').should('contain', 'Toronto Centre');
      draft
        .invoke('val')
        .should('contain', 'My family relies on respite programs that are currently underfunded.');

      cy.window().then((win) => {
        if (!win.navigator.clipboard) {
          Object.assign(win.navigator, {
            clipboard: { writeText: () => Promise.resolve() },
          });
        }
        cy.stub(win.navigator.clipboard, 'writeText').resolves().as('writeText');
      });

      cy.contains('button', 'Copy draft').click();
      draft.invoke('val').then((text) => {
        cy.get('@writeText').should('have.been.calledWith', text);
      });

      draft.clear().type('Custom letter body');
      cy.contains('button', 'Reset template').click();
      draft.invoke('val').should('contain', 'Dear [Representative Name]');

      cy.window().then((win) => {
        const navigate = cy.stub().as('mailtoNavigate');
        const original = win.location;
        const locationStub = Object.create(original);

        Object.assign(locationStub, {
          assign: navigate,
          replace: navigate,
        });

        Object.defineProperty(locationStub, 'href', {
          configurable: true,
          get: () => original.href,
          set: (value: string) => {
            navigate(value);
          },
        });

        Object.defineProperty(win, 'location', {
          configurable: true,
          enumerable: true,
          value: locationStub,
        });
      });

      cy.contains('button', 'Send Email').click();
      cy.get('@mailtoNavigate').should('have.been.calledWithMatch', /^mailto:/);
    });
  });

  describe('Authentication lifecycle', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    });

    it('creates a new account then routes the caregiver to sign in', () => {
      cy.visit('/sign-up');

      cy.intercept('POST', '**/auth/register', {
        statusCode: 201,
        body: { message: 'Created' },
      }).as('register');

      cy.get('#fullName').type('Jamie Caregiver');
      cy.get('#email').type('jamie@example.com');
      cy.get('#city').type('Burlington');
      cy.get('#province').type('Ontario');
      cy.get('#zipCode').type('L7R 2G9');
      cy.get('#description').type('Parent advocate for respite support.');
      cy.get('#password').type('Password1');

      cy.contains('button', 'Create Account').click();
      cy.wait('@register');

      cy.contains('Account created').should('be.visible');
      cy.url().should('include', '/sign-in');
    });

    it('blocks submission when required fields fail validation', () => {
      cy.visit('/sign-up');

      cy.get('#fullName').type('A');
      cy.get('#email').type('invalid-email');
      cy.get('#password').type('short');

      cy.contains('button', 'Create Account').click();

      cy.contains('Use at least 8 characters with at least one letter and one number.').should('be.visible');
      cy.contains('Enter a valid email address').should('be.visible');
      cy.contains('Full name must be at least 2 characters long.').should('be.visible');
    });

    it('signs in, stores the session, and logs out cleanly', () => {
      cy.visit('/sign-in');

      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          token: 'jwt-token',
          email: 'jamie@example.com',
          fullName: 'Jamie Caregiver',
        },
      }).as('login');

      cy.get('#email').type('jamie@example.com');
      cy.get('#password').type('Password1');
      cy.contains('button', 'Log In').click();
      cy.wait('@login');

      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
      cy.contains('Login successful').should('be.visible');
      cy.window().its('localStorage').invoke('getItem', 'token').should('eq', 'jwt-token');

      cy.get('button[aria-label="User menu"]').should('contain', 'J').click();
      cy.contains('button', 'Sign Out').click();

      cy.window().its('localStorage').invoke('getItem', 'token').should('be.null');
      cy.contains('Sign In').should('be.visible');
    });

    it('alerts the caregiver when login credentials are rejected', () => {
      cy.visit('/sign-in');

      cy.intercept('POST', '**/auth/login', {
        statusCode: 401,
        body: {
          error: 'Invalid email or password',
        },
      }).as('login');

      cy.get('#email').type('jamie@example.com');
      cy.get('#password').type('Password1');
      cy.contains('button', 'Log In').click();
      cy.wait('@login');

      cy.contains('Login failed').should('be.visible');
      cy.contains('Invalid email or password').should('be.visible');
    });
  });
});
