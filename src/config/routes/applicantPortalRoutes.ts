import React from 'react'
import { CustomRoutes } from '@/interface/common'

export const applicantPortalRoutes:CustomRoutes[] = [
{
			key: 'applicantPortal-course-offering',
			path: '/applicantPortal/course-offerings',
			component: React.lazy(() => import('@/routers/applicantPortal-routers/course-offering')),
		}, {
			key: 'applicantPortal-program',
			path: '/applicantPortal/programs',
			component: React.lazy(() => import('@/routers/applicantPortal-routers/program')),
		}, {
										key: 'applicantPortal',
										path: '/applicantPortal',
										component: React.lazy(() => import('@/routers/common/home')),
									}]

export default applicantPortalRoutes