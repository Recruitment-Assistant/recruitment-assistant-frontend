<script setup lang="ts">
import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import type { ActionGroupType } from '@/types';

const props = defineProps<{
	actions: ActionGroupType[];
}>();

const emit = defineEmits();

const handleAction = (action: ActionGroupType) => {
	emit(action.label.toLowerCase());
};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="p-1 h-fit" @click.stop>
				<IconFromSvg :icon="MenuDots" class="rotate-90" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-32 rounded-2xl" align="end">
			<DropdownMenuItem
				v-for="(action, index) in props.actions"
				:key="index"
				:class="['rounded-2xl py-3']"
				@click="handleAction(action)">
				<IconFromSvg :icon="action.icon" :class="action.style" />
				<span :class="action.style">{{ action.label }}</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
