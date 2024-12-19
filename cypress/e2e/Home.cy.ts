describe('Initial Page Load Test', () => {
  it('should load the page in under 5 seconds', () => {
    const maxLoadTime = 5000; // 5 seconds
    let startTime: number;

    cy.then(() => {
      startTime = Date.now(); // Record the start time
    });

    cy.visit('/').then(() => {
      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(maxLoadTime);
      cy.log(`Page loaded in ${loadTime} ms`);
    });

    // Ensure the main content is visible
    cy.get('h1', { timeout: maxLoadTime }).should('be.visible');
  });
});