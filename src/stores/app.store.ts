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
			path: '/dashboard',
			name: 'Dashboard',
			icon: LayoutDashboard,
			activeIcon: LayoutDashboard,
		},
		{
			id: '20000',
			path: '/jobs',
			name: 'Jobs',
			icon: BriefcaseBusiness,
			activeIcon: BriefcaseBusiness,
			children: [
				{
					id: '20001',
					path: 'screening',
					name: 'Screening',
					icon: Calendar,
					activeIcon: Calendar,
				},
			],
		},
		{
			id: '30000',
			path: '/candidates',
			name: 'Candidates',
			icon: Users,
			activeIcon: Users,
		},
		{
			id: '40000',
			name: 'Interviews',
			path: '/interviews',
			icon: Calendar,
			activeIcon: Calendar,
		},
		{
			id: '50000',
			path: '/talent-pool',
			name: 'Talent pool',
			icon: Search,
			activeIcon: Search,
		},
		{
			id: '60000',
			name: 'Settings',
			path: '/settings',
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
