<script lang="ts" setup>
import { Button } from '@/components/ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import IconFromSvg from '@/components/common/IconFromSvg.vue';
import type { ActionGroupType } from '@/types';
import { EllipsisVertical } from 'lucide-vue-next';

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
			<Button class="p-1 h-fit" variant="ghost" @click.stop>
				<IconFromSvg :icon="EllipsisVertical" class="rotate-90" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-32 rounded-2xl">
			<DropdownMenuItem
				v-for="(action, index) in props.actions"
				:key="index"
				:class="['rounded-2xl py-3']"
				@click="handleAction(action)">
				<component :is="action.icon" :class="action.style" />
				<span :class="action.style">{{ action.label }}</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
