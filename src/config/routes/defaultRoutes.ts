import React from 'react'
import { CustomRoutes } from '@/interface/common'

export const publicRoutes:CustomRoutes[] = [
{
    key: 'userLogin',
    path: '/userLogin',
    component: React.lazy(() => import('@/routers/user-auth/login')),
  }, {
    key: 'userRegister',
    path: '/userRegister',
    component: React.lazy(() => import('@/routers/user-auth/register')),
  }, {
    key: 'userForgotPassword',
    path: '/userForgotPassword',
    component: React.lazy(() => import('@/routers/user-auth/forgot-password')),
  }, {
    key: 'userResetPassword',
    path: '/userResetPassword',
    component: React.lazy(() => import('@/routers/user-auth/reset-password')),
  }]

export const defaultRoutes:CustomRoutes[] = [
{
			key: 'admissions-officer',
			path: '/admissions-officers',
			component: React.lazy(() => import('@/routers/admissions-officer')),
		}, {
			key: 'applicant',
			path: '/applicants',
			component: React.lazy(() => import('@/routers/applicant')),
		}, {
			key: 'application',
			path: '/applications',
			component: React.lazy(() => import('@/routers/application')),
		}, {
			key: 'audit-trail',
			path: '/audit-trails',
			component: React.lazy(() => import('@/routers/audit-trail')),
		}, {
			key: 'course-offering',
			path: '/course-offerings',
			component: React.lazy(() => import('@/routers/course-offering')),
		}, {
			key: 'decision',
			path: '/decisions',
			component: React.lazy(() => import('@/routers/decision')),
		}, {
			key: 'enrollment',
			path: '/enrollments',
			component: React.lazy(() => import('@/routers/enrollment')),
		}, {
			key: 'interview',
			path: '/interviews',
			component: React.lazy(() => import('@/routers/interview')),
		}, {
			key: 'payment',
			path: '/payments',
			component: React.lazy(() => import('@/routers/payment')),
		}, {
			key: 'program',
			path: '/programs',
			component: React.lazy(() => import('@/routers/program')),
		}, {
			key: 'user',
			path: '/users',
			component: React.lazy(() => import('@/routers/user')),
		}, {
							key: 'userProfile',
							path: '/userProfile',
							component: React.lazy(() => import('@/routers/user-auth/profile')),
						}, {
							key: 'userChangePassword',
							path: '/userChangePassword',
							component: React.lazy(() => import('@/routers/user-auth/profile/components/change-password')),
						}]

export default defaultRoutes