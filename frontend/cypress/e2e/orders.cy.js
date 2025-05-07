describe('Orders Page', () => {
    it('Should be able to load the orders list page', () => {
      cy.visit('http://localhost:4200/orders/list');
      cy.get('.card').should('exist'); 
    });
  
    it('Should be able to navigate to Create Order page', () => {
      cy.visit('http://localhost:4200/orders/list');
      cy.contains('Create').click();
      cy.url().should('include', '/orders/create');
    });
  
    it('Should be able to fill and submit the Create Order form', () => {
      cy.visit('http://localhost:4200/orders/create');
  
      // Assuming That I selecting a product and quantity
      cy.get('select[formControlName="product"]').select(0); 
      cy.get('input[formControlName="quantity"]').type('3');
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/orders/list');
      cy.contains('3').should('exist');
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
  
  