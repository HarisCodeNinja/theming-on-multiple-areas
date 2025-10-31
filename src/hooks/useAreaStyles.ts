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

    // Add the current area class
    body.classList.add(`area-${currentArea}`);

    // No cleanup needed - classes are removed at the start of the effect
    // This prevents the class from being removed during route changes
  }, [currentArea]);

  // Switch theme by updating data attribute on HTML element
  // The CSS files are already imported in main.tsx and scoped to data-area-theme
  useEffect(() => {
    // Set data attribute on HTML element for CSS scoping
    document.documentElement.setAttribute('data-area-theme', currentArea);

    // No cleanup needed - we always want a theme active
    // The attribute will be updated when currentArea changes
  }, [currentArea]);

  return {
    currentArea,
    areaClass: `area-${currentArea}`,
  };
};

export default useAreaStyles;
