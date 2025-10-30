/**
 * Program Module Constants
 *
 * Centralized constants for the program module to avoid magic strings
 * and make refactoring easier.
 */

export const PROGRAM_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'program',
  ENTITY_NAME: 'Program',
  ENTITY_NAME_PLURAL: 'Programs',
  LABEL_FIELD: 'description',

  // Table configuration
  TABLE_CONFIG_KEY: 'programTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'programId',

  // Field names
  FIELDS: {
    PROGRAMID: 'programId',
    PROGRAMNAME: 'programName',
    DESCRIPTION: 'description',
    DURATION: 'duration',
    FEE: 'fee',
    APPLICATIONDEADLINE: 'applicationDeadline',
    ISACTIVE: 'isActive',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    PROGRAMTYPE: 'programType'
  },

  // Routes
  ROUTES: {
    LIST: '/programs',    CREATE: '/programs/create',
    EDIT: '/programs/edit',
    VIEW: '/programs/view'
  },

  // React Query keys
  QUERY_KEY: 'program',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'program',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default PROGRAM_CONSTANTS;