/**
 * Payment Module Constants
 *
 * Centralized constants for the payment module to avoid magic strings
 * and make refactoring easier.
 */

export const PAYMENT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'payment',
  ENTITY_NAME: 'Payment',
  ENTITY_NAME_PLURAL: 'Payments',
  LABEL_FIELD: 'transactionId',

  // Table configuration
  TABLE_CONFIG_KEY: 'paymentTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'paymentId',

  // Field names
  FIELDS: {
    PAYMENTID: 'paymentId',
    AMOUNT: 'amount',
    PAYMENTDATE: 'paymentDate',
    TRANSACTIONID: 'transactionId',
    PAYMENTMETHOD: 'paymentMethod',
    STATUS: 'status',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    APPLICATIONID: 'applicationId'
  },

  // Routes
  ROUTES: {
    LIST: '/payments',    CREATE: '/payments/create',
    EDIT: '/payments/edit',
    VIEW: '/payments/view'
  },

  // React Query keys
  QUERY_KEY: 'payment',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'payment',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default PAYMENT_CONSTANTS;