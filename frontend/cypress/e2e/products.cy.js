describe('Products Page', () => {
  it('Should be able to load the product list page', () => {
    cy.visit('http://localhost:4200/products/list');
    cy.get('.card').should('exist'); // Check that at least one product is rendered
  });

  it('Should be able to navigate to Create Product page', () => {
    cy.visit('http://localhost:4200/products/list');
    cy.contains('Create').click();
    cy.url().should('include', '/products/create');
  });

  it('Should be able to fill and submit the Create Product form', () => {
    cy.visit('http://localhost:4200/products/create');

    cy.get('input[formControlName="name"]').type('Test Orange');
    cy.get('input[formControlName="price"]').type('8.5');
    cy.get('textarea[formControlName="description"]').type('Fresh and juicy');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/products/list');
    cy.contains('Test Orange').should('exist');
  });
});


// Product Form Validation (Error Cases)

describe('Product Form Validation', () => {
  it('Should show validation error when required fields are empty', () => {
    cy.visit('http://localhost:4200/products/create');
    cy.get('button[type="submit"]').click();

    cy.contains('Name is required').should('exist');
    cy.contains('Price is required').should('exist');
  });

  it('Should show error for invalid price', () => {
    cy.visit('http://localhost:4200/products/create');

    cy.get('input[formControlName="name"]').type('Broken Apple');
    cy.get('input[formControlName="price"]').type('-5'); // invalid
    cy.get('textarea[formControlName="description"]').type('Invalid price');

    cy.get('button[type="submit"]').click();

    cy.contains('Price must be greater than 0').should('exist');
  });
});

