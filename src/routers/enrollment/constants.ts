/**
 * Enrollment Module Constants
 *
 * Centralized constants for the enrollment module to avoid magic strings
 * and make refactoring easier.
 */

export const ENROLLMENT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'enrollment',
  ENTITY_NAME: 'Enrollment',
  ENTITY_NAME_PLURAL: 'Enrollments',
  LABEL_FIELD: 'studentIdInSi',

  // Table configuration
  TABLE_CONFIG_KEY: 'enrollmentTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'enrollmentId',

  // Field names
  FIELDS: {
    ENROLLMENTID: 'enrollmentId',
    PROGRAMID: 'programId',
    ENROLLMENTDATE: 'enrollmentDate',
    STUDENTIDINSI: 'studentIdInSi',
    STATUS: 'status',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    APPLICATIONID: 'applicationId'
  },

  // Routes
  ROUTES: {
    LIST: '/enrollments',    CREATE: '/enrollments/create',
    EDIT: '/enrollments/edit',
    VIEW: '/enrollments/view'
  },

  // React Query keys
  QUERY_KEY: 'enrollment',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'enrollment',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default ENROLLMENT_CONSTANTS;