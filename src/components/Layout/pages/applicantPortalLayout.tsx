import React from 'react';
import UnifiedLayout from './unifiedLayout';
import { applicantPortalLayoutConfig } from '../layoutconfig';

const ApplicantPortalLayout: React.FC = () => {
  return <UnifiedLayout config={applicantPortalLayoutConfig} />;
};

export default ApplicantPortalLayout;
