/**
 * AdmissionsOfficer Module Constants
 *
 * Centralized constants for the admissionsOfficer module to avoid magic strings
 * and make refactoring easier.
 */

export const ADMISSIONSOFFICER_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'admissionsOfficer',
  ENTITY_NAME: 'AdmissionsOfficer',
  ENTITY_NAME_PLURAL: 'AdmissionsOfficers',
  LABEL_FIELD: 'title',

  // Table configuration
  TABLE_CONFIG_KEY: 'admissionsOfficerTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'admissionsOfficerId',

  // Field names
  FIELDS: {
    ADMISSIONSOFFICERID: 'admissionsOfficerId',
    DEPARTMENT: 'department',
    TITLE: 'title',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    USERID: 'userId'
  },

  // Routes
  ROUTES: {
    LIST: '/admissionsOfficers',    CREATE: '/admissionsOfficers/create',
    EDIT: '/admissionsOfficers/edit',
    VIEW: '/admissionsOfficers/view'
  },

  // React Query keys
  QUERY_KEY: 'admissionsOfficer',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'admissionsOfficer',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default ADMISSIONSOFFICER_CONSTANTS;