import { useEffect } from 'react';
import { useCurrentArea } from './useCurrentArea';

import '@/style/applicantPortalMain.scss';
// import '@/style/areas/areaScoping.scss';
// Import other area styles here as you add them

/**
 * Hook that manages area-specific CSS classes and styling
 * This ensures the correct styles are applied based on the current area
 */
export const useAreaStyles = () => {
	const currentArea = useCurrentArea();

	useEffect(() => {
		const body = document.body;

		// Remove all area classes first
		body.classList.remove('area-public', 'area-applicantPortal', 'area-default');
		// Add more area classes here as you create them
		// body.classList.remove('area-applicantPortal');

		// Add the current area class
		body.classList.add(`area-${currentArea}`);

		// Cleanup function to remove classes when component unmounts
		return () => {
			body.classList.remove(`area-${currentArea}`);
		};
	}, [currentArea]);

	// Dynamically load area-specific theme CSS
	useEffect(() => {
		// Remove any existing theme link
		const existingThemeLink = document.getElementById('area-theme-css');
		if (existingThemeLink) {
			existingThemeLink.remove();
		}

		// Map area to CSS file
		const themeMap: Record<string, string> = {
			default: '/src/style/themes/defaultArea.css',
			applicantPortal: '/src/style/themes/applicantPortal.css',
			public: '/src/style/themes/default.css',
		};

		// Create and append new theme link
		const themePath = themeMap[currentArea] || themeMap.default;
		const link = document.createElement('link');
		link.id = 'area-theme-css';
		link.rel = 'stylesheet';
		link.href = themePath;
		document.head.appendChild(link);

		// Cleanup function
		return () => {
			const themeLink = document.getElementById('area-theme-css');
			if (themeLink) {
				themeLink.remove();
			}
		};
	}, [currentArea]);

	return {
		currentArea,
		areaClass: `area-${currentArea}`,
	};
};

export default useAreaStyles;
