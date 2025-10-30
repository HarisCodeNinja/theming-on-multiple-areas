/**
 * Interview Module Constants
 *
 * Centralized constants for the interview module to avoid magic strings
 * and make refactoring easier.
 */

export const INTERVIEW_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'interview',
  ENTITY_NAME: 'Interview',
  ENTITY_NAME_PLURAL: 'Interviews',
  LABEL_FIELD: 'note',

  // Table configuration
  TABLE_CONFIG_KEY: 'interviewTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'interviewId',

  // Field names
  FIELDS: {
    INTERVIEWID: 'interviewId',
    INTERVIEWDATE: 'interviewDate',
    INTERVIEWTYPE: 'interviewType',
    NOTE: 'note',
    OUTCOME: 'outcome',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    APPLICATIONID: 'applicationId',
    ADMISSIONSOFFICERID: 'admissionsOfficerId'
  },

  // Routes
  ROUTES: {
    LIST: '/interviews',    CREATE: '/interviews/create',
    EDIT: '/interviews/edit',
    VIEW: '/interviews/view'
  },

  // React Query keys
  QUERY_KEY: 'interview',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'interview',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default INTERVIEW_CONSTANTS;