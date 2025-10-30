/**
 * CourseOffering Module Constants
 *
 * Centralized constants for the courseOffering module to avoid magic strings
 * and make refactoring easier.
 */

export const COURSEOFFERING_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'courseOffering',
  ENTITY_NAME: 'CourseOffering',
  ENTITY_NAME_PLURAL: 'CourseOfferings',
  LABEL_FIELD: 'description',

  // Table configuration
  TABLE_CONFIG_KEY: 'courseOfferingTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'courseOfferingId',

  // Field names
  FIELDS: {
    COURSEOFFERINGID: 'courseOfferingId',
    COURSENAME: 'courseName',
    DESCRIPTION: 'description',
    STARTDATE: 'startDate',
    ENDDATE: 'endDate',
    MAXCAPACITY: 'maxCapacity',
    CURRENTENROLLMENT: 'currentEnrollment',
    ISACTIVE: 'isActive',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    PROGRAMID: 'programId'
  },

  // Routes
  ROUTES: {
    LIST: '/courseOfferings',    VIEW: '/courseOfferings/view'
  },

  // React Query keys
  QUERY_KEY: 'courseOffering',

  // Permission configuration
  PERMISSIONS: {
    MODULE: 'applicantPortal',
    RESOURCE: 'courseOffering',
    ACTIONS: {
      VIEW: 'view' as const
    },
  },
} as const;

export default COURSEOFFERING_CONSTANTS;