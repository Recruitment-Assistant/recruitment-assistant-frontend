<script lang="ts" setup>
import UserAvatar from '@/components/common/UserAvatar.vue';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import router from '@/routers';
import { ChevronDown, LogOut, User } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

const handleLogout = async () => {
	const status = await authStore.logout();
	if (status === 204) {
		router.push('/auth');
	}
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button class="border-none hover:bg-white h-auto gap-4 p-0" variant="outline">
				<UserAvatar class="w-12 h-12" />
				<div>
					<p class="text-start text-base font-medium">User01</p>
					<p class="text-start text-sm font-normal text-slate-600">HR Manager</p>
				</div>
				<ChevronDown />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-56 bg-white border-slate-200">
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="handleLogout">
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
