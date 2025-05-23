<script lang="ts" setup>
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { useAppStore } from '@/stores/app.store';
import { PanelRightClose, PanelRightOpen, Search } from 'lucide-vue-next';
import NotificationPopover from './NotificationPopover.vue';
import UserDropdownMenu from './UserDropdownMenu.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { ref } from 'vue';

const appStore = useAppStore();

const search = ref<string>('');
const handleSidebar = () => {
	appStore.toggleSidebar();
};
</script>
<template>
	<header
		class="bg-background h-20 shadow-sm sticky top-0 flex gap-4 items-center justify-between px-8 z-50">
		<div class="flex gap-4 items-center">
			<button class="p-2 border rounded" @click="handleSidebar">
				<PanelRightOpen v-if="!appStore.isSmallSidebar" :size="18" />
				<PanelRightClose v-else :size="18" />
			</button>
			<InputWithIcon
				:icon="Search"
				:model-value="search"
				class="rounded-full w-[450px] text-accent-foreground"
				placeholder="Search..." />
		</div>

		<div class="flex gap-4 items-center">
			<NotificationPopover />
			<ThemeToggle />
			<UserDropdownMenu />
		</div>
	</header>
</template>
