/**
 * AuditTrail Module Constants
 *
 * Centralized constants for the auditTrail module to avoid magic strings
 * and make refactoring easier.
 */

export const AUDITTRAIL_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'auditTrail',
  ENTITY_NAME: 'AuditTrail',
  ENTITY_NAME_PLURAL: 'AuditTrails',
  LABEL_FIELD: 'entityType',

  // Table configuration
  TABLE_CONFIG_KEY: 'auditTrailTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'auditId',

  // Field names
  FIELDS: {
    AUDITID: 'auditId',
    ENTITYTYPE: 'entityType',
    ENTITYID: 'entityId',
    ACTION: 'action',
    OLDVALUE: 'oldValue',
    NEWVALUE: 'newValue',
    CHANGETIMESTAMP: 'changeTimestamp',
    CHANGEDBYUSERID: 'changedByUserId'
  },

  // Routes
  ROUTES: {
    LIST: '/auditTrails',    VIEW: '/auditTrails/view'
  },

  // React Query keys
  QUERY_KEY: 'auditTrail',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'auditTrail',
    ACTIONS: {
      VIEW: 'view' as const
    },
  },
} as const;

export default AUDITTRAIL_CONSTANTS;