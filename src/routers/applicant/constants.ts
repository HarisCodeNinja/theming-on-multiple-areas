/**
 * Applicant Module Constants
 *
 * Centralized constants for the applicant module to avoid magic strings
 * and make refactoring easier.
 */

export const APPLICANT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'applicant',
  ENTITY_NAME: 'Applicant',
  ENTITY_NAME_PLURAL: 'Applicants',
  LABEL_FIELD: 'firstName',

  // Table configuration
  TABLE_CONFIG_KEY: 'applicantTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'applicantId',

  // Field names
  FIELDS: {
    APPLICANTID: 'applicantId',
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    DATEOFBIRTH: 'dateOfBirth',
    GENDER: 'gender',
    NATIONALITY: 'nationality',
    ADDRESS: 'address',
    PHONENUMBER: 'phoneNumber',
    STATUS: 'status',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    USERID: 'userId'
  },

  // Routes
  ROUTES: {
    LIST: '/applicants',    CREATE: '/applicants/create',
    EDIT: '/applicants/edit',
    VIEW: '/applicants/view'
  },

  // React Query keys
  QUERY_KEY: 'applicant',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'applicant',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default APPLICANT_CONSTANTS;