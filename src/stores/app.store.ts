import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
	BriefcaseBusiness,
	Calendar,
	LayoutDashboard,
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
			path: '/recruiter/jobs',
			name: 'Jobs',
			icon: BriefcaseBusiness,
			activeIcon: BriefcaseBusiness,
		},
		{
			id: '30000',
			path: '/recruiter/candidates',
			name: 'Candidates',
			icon: Users,
			activeIcon: Users,
		},
		{
			id: '40000',
			name: 'Interviews',
			path: '/recruiter/interviews',
			icon: Calendar,
			activeIcon: Calendar,
		},
		{
			id: '50000',
			path: '/recruiter/talent-pool',
			name: 'Talent pool',
			icon: Search,
			activeIcon: Search,
		},
		{
			id: '60000',
			name: 'Settings',
			path: '/recruiter/settings',
			icon: Settings,
			activeIcon: Settings,
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
