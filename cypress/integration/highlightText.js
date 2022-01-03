describe("Webinar", () => {
  it("Highlighting Text", () => {
    cy.visit("http://note.ly/");
    cy.waitUntil(function () {
      return cy.get("div.note-add").should("be.visible");
    });
    cy.get("div.note-add").should("be.visible").click();
    cy.get("div.note div.displayBox")
      .should("be.visible")
      .click()
      .type("Visual Test");
    cy.get("div.note div.displayBox")
      .click()
      .realPress(["Shift", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft"]);
    cy.get("div.nicEdit-buttonContain").eq(3).click();
    //Focus change
    cy.get("div.note div.displayBox").click();
  });
});
