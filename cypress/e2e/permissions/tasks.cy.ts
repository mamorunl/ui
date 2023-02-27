describe('permissions: task', () => {
  before(() => {
    cy.log('Seeding & preparing for test.')
      .exec('cd ../invoiceninja && make prepare-for-cypress')
      .log('Seeding complete. Running tests.');
  });

  it("can't view task", () => {
    cy.login()
      .clearPermissions()
      .get('button')
      .contains('Save')
      .click()
      .get('div')
      .contains('Successfully updated user');

    cy.login('permissions@example.com', 'password');

    cy.get('.flex-grow > .flex-1').should('not.contain.text', 'Tasks');
  });

  it('can view tasks', () => {
    cy.login()
      .clearPermissions()
      .setPermission('view_task')
      .get('button')
      .contains('Save')
      .click()
      .get('div')
      .contains('Successfully updated user');

    cy.login('permissions@example.com', 'password');

    cy.get('a').contains('Tasks').click();

    cy.assertNoPermissionNotVisible();
  });

  it("can't create a task", () => {
    cy.login()
      .clearPermissions()
      .setPermission('view_task')
      .get('button')
      .contains('Save')
      .click()
      .get('div')
      .contains('Successfully updated user');

    cy.login('permissions@example.com', 'password');

    cy.get('a').contains('Tasks').click();
    cy.get('a').contains('New Task').click();

    cy.assertNoPermissionIsVisible();
  });

  it('can create a task', () => {
    cy.login()
      .clearPermissions()
      .setPermission('view_task')
      .setPermission('create_task')
      .get('button')
      .contains('Save')
      .click()
      .get('div')
      .contains('Successfully updated user');

    cy.login('permissions@example.com', 'password');

    cy.get('a').contains('Tasks').click();
    cy.get('a').contains('New Task').click();

    cy.assertNoPermissionNotVisible();
  });

  it.skip('can view assigned task without view_all or view_task permission', () => {
    cy.login()
      .clearPermissions()
      .setPermission('create_task')
      .get('button')
      .contains('Save')
      .click()
      .wait(1000)
      .get('div')
      .contains('Successfully updated user');

    cy.login('permissions@example.com', 'password');

    cy.get('a').contains('Tasks').click();
    cy.get('a').contains('New Task').click();

    cy.get('#headlessui-combobox-input-\\:rg\\:')
      .click()
      .get('[data-cy="dc-0"]')
      .click({ force: true });

    cy.wait(200);

    cy.get('button').contains('Save').click();

    cy.get('div').contains('Successfully created task');

    cy.url().should('include', '/edit');

    cy.assertNoPermissionNotVisible();
  });
});

export {};