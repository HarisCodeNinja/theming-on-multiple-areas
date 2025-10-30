import { MenuItem } from "@/interface/common"
import * as LucideIcons from 'lucide-react';

export const applicantPortalMenus : MenuItem[] = [
    {
        key: "/applicantPortal/programs",
        label: "programs",
        scope: [],
        icon: LucideIcons.GraduationCap
    },
    {
        key: "/applicantPortal/course-offerings",
        label: "Course Offerings",
        scope: [],
        icon: LucideIcons.BookOpen
    }
]