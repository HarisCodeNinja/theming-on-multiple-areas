/**
 * Application Module Constants
 *
 * Centralized constants for the application module to avoid magic strings
 * and make refactoring easier.
 */

export const APPLICATION_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'application',
  ENTITY_NAME: 'Application',
  ENTITY_NAME_PLURAL: 'Applications',
  LABEL_FIELD: 'name',

  // Table configuration
  TABLE_CONFIG_KEY: 'applicationTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'applicationId',

  // Field names
  FIELDS: {
    APPLICATIONID: 'applicationId',
    PROGRAMID: 'programId',
    APPLICATIONDATE: 'applicationDate',
    SUBMISSIONSTATUS: 'submissionStatus',
    APPLICATIONFEEPAID: 'applicationFeePaid',
    PAYMENTID: 'paymentId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    APPLICANTID: 'applicantId',
    CURRENTDECISIONID: 'currentDecisionId'
  },

  // Routes
  ROUTES: {
    LIST: '/applications',    CREATE: '/applications/create',
    EDIT: '/applications/edit',
    VIEW: '/applications/view'
  },

  // React Query keys
  QUERY_KEY: 'application',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'application',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default APPLICATION_CONSTANTS;