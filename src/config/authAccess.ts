export type Action = 'view' | 'edit' | 'add' | 'delete' | 'upload' | 'detail';

		 type ObjectAccessRights = {
			 [object: string]: Action[];
		 };
		 
		 type AccessRights = {
			 [scope: string]: ObjectAccessRights;
		 };
		 
		 export const accessRights : AccessRights = {
  'applicantPortal_user:applicant': {
    courseOffering: ['detail', 'view'],
    program: ['detail', 'view']
  },
  '_user:admin': {
    admissionsOfficer: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    applicant: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    application: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    auditTrail: ['detail', 'view'],
    courseOffering: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    decision: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    enrollment: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    interview: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    payment: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    program: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    user: ['add', 'delete', 'detail', 'edit', 'upload', 'view']
  },
  '_user:admissionsOfficer': {
    admissionsOfficer: ['detail', 'edit', 'upload', 'view'],
    applicant: ['detail', 'edit', 'upload', 'view'],
    application: ['detail', 'edit', 'upload', 'view'],
    auditTrail: ['detail', 'view'],
    courseOffering: ['detail', 'view'],
    decision: ['add', 'detail', 'edit', 'upload', 'view'],
    enrollment: ['detail', 'view'],
    interview: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    payment: ['detail', 'view'],
    program: ['detail', 'view']
  },
  '_user:applicant': {
    applicant: ['detail', 'edit', 'upload', 'view'],
    application: ['add', 'detail', 'edit', 'upload', 'view'],
    courseOffering: ['detail', 'view'],
    decision: ['detail', 'view'],
    enrollment: ['detail', 'view'],
    interview: ['detail', 'view'],
    payment: ['add', 'detail', 'upload', 'view'],
    program: ['detail', 'view']
  }
};