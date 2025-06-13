<script lang="ts" setup>
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MonitorCog, MoonStar, SunMoon } from 'lucide-vue-next';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';

const mode = useColorMode();
const isActiveIconMode = computed(() => {
	const activeMode = mode.state.value;
	if (activeMode === 'light') return SunMoon;
	if (activeMode === 'dark') return MoonStar;
	return MonitorCog;
});
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button size="icon" variant="ghost">
				<component :is="isActiveIconMode" class="text-foreground" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="p-2">
			<DropdownMenuGroup>
				<DropdownMenuItem
					class="flex items-center justify-between gap-x-1"
					@click="mode = 'light'">
					Light
					<SunMoon class="w-5 h-5 inline-block" />
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex items-center justify-between gap-x-1"
					@click="mode = 'dark'">
					Dark
					<MoonStar class="w-5 h-5 inline-block" />
				</DropdownMenuItem>
				<DropdownMenuItem
					class="flex items-center justify-between gap-x-1"
					@click="mode = 'auto'">
					System
					<MonitorCog class="w-5 h-5 inline-block" />
				</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
