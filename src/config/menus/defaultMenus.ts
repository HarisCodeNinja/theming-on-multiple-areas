import { MenuItem } from "@/interface/common"
import * as LucideIcons from 'lucide-react';

export const authMenus : MenuItem[] = [
{
    label: 'user',
    key: '/userLogin',
	scope: []}]
export const defaultMenus : MenuItem[] = [
    {
        key: "/users",
        label: "Users",
        scope: ["user:admin"],
        icon: LucideIcons.Users
    },
    {
        key: "/applicants",
        label: "Applicants",
        scope: ["user:admin", "user:admissionsOfficer"],
        icon: LucideIcons.UserCheck
    },
    {
        key: "/programs",
        label: "Programs",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.GraduationCap
    },
    {
        key: "/course-offerings",
        label: "Course Offerings",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.BookOpen
    },
    {
        key: "/admissions-officers",
        label: "Admissions Officers",
        scope: ["user:admin"],
        icon: LucideIcons.UserCog
    },
    {
        key: "/applications",
        label: "Applications",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.FileText
    },
    {
        key: "/interviews",
        label: "Interviews",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.CalendarCheck
    },
    {
        key: "/decisions",
        label: "Decisions",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.Award
    },
    {
        key: "/enrollments",
        label: "Enrollments",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.CheckCircle
    },
    {
        key: "/payments",
        label: "Payments",
        scope: ["user:admin", "user:applicant", "user:admissionsOfficer"],
        icon: LucideIcons.CreditCard
    },
    {
        key: "/audit-trails",
        label: "Audit Trail",
        scope: ["user:admin", "user:admissionsOfficer"],
        icon: LucideIcons.ScrollText
    }
]