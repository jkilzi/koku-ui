/**
 * E2E tests for the Sources tab in the Settings page.
 * The Sources MFE is loaded as a federated module via Scalprum.
 */

const SETTINGS_URL = '/openshift/cost-management/settings';
const SOURCES_TAB_INDEX = 5;

const navigateToSourcesTab = () => {
  cy.visit(SETTINGS_URL);
  cy.waitForFederatedModule();
  cy.get('[role="tab"]').eq(SOURCES_TAB_INDEX).click();
};

describe('Sources tab', () => {
  describe('Empty state', () => {
    beforeEach(() => {
      cy.loadApiInterceptors();
      cy.interceptSourcesEmpty();
      navigateToSourcesTab();
    });

    it('should display the Sources tab in the Settings page', () => {
      cy.get('[role="tab"]').eq(SOURCES_TAB_INDEX).should('contain.text', 'Sources');
    });

    it('should show the empty state with source type tiles when no sources exist', () => {
      cy.contains('No sources').should('be.visible');
      cy.contains('Add a source to get started with cost management.').should('be.visible');

      cy.contains('OpenShift Container Platform').should('be.visible');
      cy.contains('Amazon Web Services').should('be.visible');
      cy.contains('Microsoft Azure').should('be.visible');
      cy.contains('Google Cloud Platform').should('be.visible');
    });

    it('should open the Add Source wizard when clicking a source type tile', () => {
      cy.contains('OpenShift Container Platform').click();

      cy.get('.pf-v6-c-modal-box').should('be.visible');
      cy.get('.pf-v6-c-modal-box').contains('Add source').should('be.visible');
    });
  });

  describe('Sources table', () => {
    beforeEach(() => {
      cy.loadApiInterceptors();
      cy.interceptSourcesCRUD();
      navigateToSourcesTab();
    });

    it('should display the sources table with data', () => {
      cy.contains('My OpenShift Cluster').should('be.visible');
      cy.contains('AWS Production Account').should('be.visible');
      cy.contains('OpenShift Container Platform').should('be.visible');
      cy.contains('Amazon Web Services').should('be.visible');
    });

    it('should show the Add source button in the toolbar', () => {
      cy.contains('button', 'Add source').should('be.visible');
    });

    it('should open the Add Source wizard from the toolbar button', () => {
      cy.contains('button', 'Add source').click();

      cy.get('.pf-v6-c-modal-box').should('be.visible');
      cy.get('.pf-v6-c-modal-box').contains('Add source').should('be.visible');
    });
  });

  describe('Add Source wizard', () => {
    beforeEach(() => {
      cy.loadApiInterceptors();
      cy.interceptSourcesCRUD();
      navigateToSourcesTab();
    });

    it('should walk through the OCP wizard flow and submit', () => {
      cy.contains('button', 'Add source').click();
      cy.get('.pf-v6-c-modal-box').should('be.visible');

      // Step 1: Select source type — click the OCP card
      cy.get('.pf-v6-c-modal-box').contains('OpenShift Container Platform').click();
      cy.get('.pf-v6-c-modal-box').contains('button', 'Next').click();

      // Step 2: Source name
      cy.get('.pf-v6-c-modal-box').find('input[name="source_name"]').type('E2E Test Source');
      cy.get('.pf-v6-c-modal-box').contains('button', 'Next').click();

      // Step 3: OCP credentials — cluster ID
      cy.get('.pf-v6-c-modal-box')
        .find('input[name="credentials.cluster_id"]')
        .type('e2e-cluster-12345');
      cy.get('.pf-v6-c-modal-box').contains('button', 'Next').click();

      // Step 4: Review — verify we reached the review step
      cy.get('.pf-v6-c-modal-box')
        .contains('Review the information below')
        .should('be.visible');

      // Submit
      cy.get('.pf-v6-c-modal-box').contains('button', 'Submit').click();

      cy.wait('@createSource');
      cy.wait('@createApplication');

      // Modal should close after successful submission
      cy.get('.pf-v6-c-modal-box').should('not.exist');
    });
  });

  describe('Kebab actions', () => {
    beforeEach(() => {
      cy.loadApiInterceptors();
      cy.interceptSourcesCRUD();
      navigateToSourcesTab();
    });

    it('should open the rename modal from the kebab menu', () => {
      // Click the first kebab toggle button in the table
      cy.get('table').find('[data-ouia-component-type="PF6/Dropdown"] button, .pf-v6-c-menu-toggle').first().click();

      cy.contains('Rename').click();

      cy.get('.pf-v6-c-modal-box').should('be.visible');
      cy.get('.pf-v6-c-modal-box').find('input#source-rename').should('have.value', 'My OpenShift Cluster');
    });

    it('should open the remove modal from the kebab menu', () => {
      cy.get('table').find('[data-ouia-component-type="PF6/Dropdown"] button, .pf-v6-c-menu-toggle').first().click();

      cy.contains('Remove').click();

      cy.get('.pf-v6-c-modal-box').should('be.visible');
      cy.get('.pf-v6-c-modal-box').contains('My OpenShift Cluster').should('be.visible');
      cy.get('.pf-v6-c-modal-box').contains('cannot be undone').should('be.visible');
    });

    it('should submit the rename and close the modal', () => {
      cy.get('table').find('[data-ouia-component-type="PF6/Dropdown"] button, .pf-v6-c-menu-toggle').first().click();
      cy.contains('Rename').click();

      cy.get('.pf-v6-c-modal-box').find('input#source-rename').clear().type('Renamed Cluster');
      cy.get('.pf-v6-c-modal-box').contains('button', 'Save').click();

      cy.wait('@updateSource');
      cy.get('.pf-v6-c-modal-box').should('not.exist');
    });

    it('should submit the remove and close the modal', () => {
      cy.get('table').find('[data-ouia-component-type="PF6/Dropdown"] button, .pf-v6-c-menu-toggle').first().click();
      cy.contains('Remove').click();

      cy.get('.pf-v6-c-modal-box').contains('button', 'Remove').click();

      cy.wait('@deleteSource');
      cy.get('.pf-v6-c-modal-box').should('not.exist');
    });
  });
});
