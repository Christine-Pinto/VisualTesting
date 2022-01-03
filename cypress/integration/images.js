describe("Webinar", () => {
  before(() => {
    cy.eyesOpen({
      testName: "Webinar Visual Tests",
    });
  });

  after(() => {
    // Call Close on eyes to let the server know it should display the results
    cy.eyesClose();
  });

  it("Check Image loading", () => {
    cy.pause();
    cy.visit("/");
    // Solution for loading image issue from https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get("picture.latest-article__poster img")
      .first()
      // Sometimes images are bigger than the viewable screen. In that case you should use exist instead of visible.
      .should("be.visible")
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(1);
      });
    cy.eyesCheckWindow({
      tag: "Image loaded",
      fully: true,
      target: "window",
    });
  });

  it("Check Style loading", () => {
    cy.pause();
    cy.visit("/");
    cy.waitForResources("styles.css");
    cy.eyesCheckWindow({
      tag: "Wait Ressource",
      fully: true,
      target: "window",
    });
  });

  it("Slow Scrolling", () => {
    cy.pause();
    cy.visit("/");
    cy.waitUntil(function () {
      return cy
        .get("article.homepage__article-last picture.latest-article__poster")
        .should("be.visible");
    });
    // Slow scrolling to the end of the page to enable the lazy loading of the images
    cy.document().then((doc) => {
      const height = doc.body.scrollHeight;
      for (let i = 0; i <= height; i += 100) {
        cy.scrollTo(0, i);
        cy.wait(100);
      }
    });

    cy.eyesCheckWindow({
      tag: "Test Guild Slow Scrolling",
      fully: true,
      target: "window",
    });
  });
});
