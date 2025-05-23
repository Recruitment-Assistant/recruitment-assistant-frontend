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
		router.push('/auth/login');
	}
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button class="border-none hover:bg-muted/50 h-auto gap-4 p-0" variant="outline">
				<UserAvatar :url="authStore.account?.avatar" class="w-12 h-12" />
				<div>
					<p class="text-start text-base font-medium">{{ authStore.account?.name }}</p>
					<p class="text-start text-sm font-normal text-slate-600">HR Manager</p>
				</div>
				<ChevronDown />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-56 bg-background border-slate-200">
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem class="cursor-pointer">
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem class="cursor-pointer" @click="handleLogout">
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
