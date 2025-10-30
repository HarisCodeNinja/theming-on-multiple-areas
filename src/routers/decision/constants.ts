/**
 * Decision Module Constants
 *
 * Centralized constants for the decision module to avoid magic strings
 * and make refactoring easier.
 */

export const DECISION_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'decision',
  ENTITY_NAME: 'Decision',
  ENTITY_NAME_PLURAL: 'Decisions',
  LABEL_FIELD: 'note',

  // Table configuration
  TABLE_CONFIG_KEY: 'decisionTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'decisionId',

  // Field names
  FIELDS: {
    DECISIONID: 'decisionId',
    DECISIONTYPE: 'decisionType',
    DECISIONDATE: 'decisionDate',
    COMMUNICATEDDATE: 'communicatedDate',
    COMMUNICATEDBYUSERID: 'communicatedByUserId',
    NOTE: 'note',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    APPLICATIONID: 'applicationId'
  },

  // Routes
  ROUTES: {
    LIST: '/decisions',    CREATE: '/decisions/create',
    EDIT: '/decisions/edit',
    VIEW: '/decisions/view'
  },

  // React Query keys
  QUERY_KEY: 'decision',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'decision',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default DECISION_CONSTANTS;