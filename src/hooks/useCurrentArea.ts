import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { publicRoutes } from '@/config/routes/defaultRoutes';

export type AppArea = 'public' | 'applicantPortal' | 'default';

export const useCurrentArea = (): AppArea => {
	const location = useLocation();

	const currentArea = useMemo((): AppArea => {
		const pathname = location.pathname;

		if (pathname === '/applicantPortal' || pathname.startsWith('/applicantPortal/')) {
			return 'applicantPortal';
		}


		// Check if it's a public route (authentication routes)
		if (publicRoutes.some(route => pathname.startsWith(route.path))) {
			return 'public';
		}

		// Default area for authenticated users
		return 'default';
	}, [location.pathname]);

	return currentArea;
};

export default useCurrentArea;