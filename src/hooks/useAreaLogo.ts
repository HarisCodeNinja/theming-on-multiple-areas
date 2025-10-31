import { useMemo } from 'react';
import { useCurrentArea } from './useCurrentArea';
import { useAppSelector } from '@/store';

type AppArea = 'default' | 'applicantPortal' | 'public';

export const useAreaLogo = () => {
  const currentArea = useCurrentArea();
  const isDarkTheme = useAppSelector((state) => state.session.isDarkTheme);

  const logoPath = useMemo(() => {
    const theme = isDarkTheme ? 'dark' : 'light';

    const logoMap: Record<AppArea, string> = {
      default: `/logoDefaultArea-${theme}.png`,
      applicantPortal: `/logoApplicantPortal-${theme}.png`,
      public: '/logo.png',
    };

    return logoMap[currentArea as AppArea] || '/logo.png';
  }, [currentArea, isDarkTheme]);

  return {
    logoPath,
    currentArea,
    isDarkTheme,
  };
};

export default useAreaLogo;
