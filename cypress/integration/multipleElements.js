describe("Webinar", () => {
  it("Check multiple Elements", () => {
    cy.visit("/");
    cy.get("article.tease-podcast")
      .should("have.length", 4)
      .each(($el) => {
        cy.get($el).children("h2").should("be.visible");
        cy.get($el).find("a").should("be.visible").should("have.attr", "href");
      });
  });
});
