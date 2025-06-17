import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
	BriefcaseBusiness,
	Building,
	Calendar,
	LayoutDashboard,
	LockKeyhole,
	Search,
	Settings,
	Users,
} from 'lucide-vue-next';

import type { RouteType } from '@/types';

export const useAppStore = defineStore('app-store', () => {
	//defineState
	const routeList = ref<RouteType[]>([
		{
			id: '10000',
			path: '/recruiter/dashboard',
			name: 'Dashboard',
			icon: LayoutDashboard,
			activeIcon: LayoutDashboard,
		},
		{
			id: '20000',
			path: '/recruiter/department',
			name: 'Department',
			icon: Building,
			activeIcon: Building,
		},
		{
			id: '30000',
			path: '/recruiter/job',
			name: 'Jobs',
			icon: BriefcaseBusiness,
			activeIcon: BriefcaseBusiness,
		},
		{
			id: '40000',
			path: '/recruiter/candidate',
			name: 'Candidates',
			icon: Users,
			activeIcon: Users,
		},
		{
			id: '50000',
			name: 'Interviews',
			path: '/recruiter/interview',
			icon: Calendar,
			activeIcon: Calendar,
		},
		{
			id: '60000',
			path: '/recruiter/talent-pool',
			name: 'Talent pool',
			icon: Search,
			activeIcon: Search,
		},
		{
			id: '70000',
			name: 'Settings',
			path: '/recruiter/setting',
			icon: Settings,
			activeIcon: Settings,
		},
		{
			id: '80000',
			name: 'Administration',
			path: '/recruiter/administration',
			icon: LockKeyhole,
			activeIcon: LockKeyhole,
		},
	]);
	const isSmallSidebar = ref(
		localStorage.getItem('smallSidebar')
			? localStorage.getItem('smallSidebar') === 'true'
			: false,
	);

	const toggleSidebar = () => {
		isSmallSidebar.value = !isSmallSidebar.value;
		localStorage.setItem('smallSidebar', String(isSmallSidebar.value));
	};

	return {
		routeList,
		isSmallSidebar,
		toggleSidebar,
	};
});
