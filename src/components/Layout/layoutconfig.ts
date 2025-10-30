import { applicantPortalMenus } from '@/config/menus/applicantPortalMenus';
import { defaultMenus } from '@/config/menus/defaultMenus';

export const applicantPortalLayoutConfig = {
  type: 'applicantPortal' as const,
  title: 'Applicant Portal',
  logoPath: '/logo.png',
  showFooter: true,
  showCompactToggle: true,
  showLanguageSwitcher: false,
  logoutRedirect: '/userLogin',
  settingsPath: '/settings',
  menus: applicantPortalMenus,
  profilePath: '/profile'
};
export const defaultLayoutConfig = {
  type: 'default' as const,
  title: 'Default Area',
  logoPath: '/logo.png',
  showFooter: true,
  showCompactToggle: true,
  showLanguageSwitcher: false,
  logoutRedirect: '/userLogin',
  settingsPath: '/settings',
  menus: defaultMenus,
  profilePath: '/profile'
};