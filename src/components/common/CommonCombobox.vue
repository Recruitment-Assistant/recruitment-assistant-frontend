<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import {
	Combobox,
	ComboboxAnchor,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';
import { cn } from '@/lib/utils';
import type { ComboboxType } from '@/types';
import { Check, ChevronDown, Search } from 'lucide-vue-next';
import { type HTMLAttributes, ref, watch } from 'vue';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';
import IconFromSvg from './IconFromSvg.vue';

interface Prop {
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	multiple?: boolean;
	list: ComboboxType[];
	isSearch?: boolean;
	label: string;
	icon?: any;
	dropdownWidth?: number;
	list_size?: 'small' | 'medium' | 'large';
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:modelValue', payload: string | number | string[] | number[]): void;
}>();

const selectedValue = ref<ComboboxType | ComboboxType[]>();
const open = ref(false);

const handleSelect = (value: any) => {
	selectedValue.value = value;
	emit('update:modelValue', value);
};

const handleOpen = (isOpen: boolean) => {
	open.value = isOpen;
};

watch(
	() => props.list,
	() => {
		selectedValue.value = undefined;
	},
);
</script>

<template>
	<Combobox
		v-model="selectedValue"
		:multiple="multiple"
		:open="open"
		by="label"
		@update:model-value="handleSelect"
		@update:open="handleOpen">
		<ComboboxAnchor as-child>
			<ComboboxTrigger as-child>
				<Button
					v-if="multiple"
					:class="cn('justify-start text-sm text-slate-600', props.class)"
					variant="outline"
					@click.stop>
					<IconFromSvg v-if="icon" :icon="icon" />
					<span class="flex-1 text-start">{{
						selectedValue && (selectedValue as ComboboxType[]).length > 0
							? `${(selectedValue as ComboboxType[]).length} selected`
							: label
					}}</span>
					<component
						:class="open ? 'rotate-180' : 'rotate-0'"
						:icon="ChevronDown"
						class="duration-200" />
				</Button>
				<Button
					v-else
					:class="cn('justify-between text-sm text-slate-600', props.class)"
					variant="outline"
					@click.stop>
					<IconFromSvg v-if="icon" :icon="icon" />
					{{ (selectedValue as ComboboxType)?.label ?? label }}
					<IconFromSvg
						:class="open ? 'rotate-180' : 'rotate-0'"
						:icon="ChevronDown"
						class="duration-200" />
				</Button>
			</ComboboxTrigger>
		</ComboboxAnchor>

		<ComboboxList
			:class="
				cn(
					'w-[300px] rounded-xl',
					list_size === 'small' && 'w-[300px]',
					list_size === 'medium' && 'w-[500px]',
					list_size === 'large' && 'w-[700px]',
				)
			">
			<div v-if="isSearch" class="relative w-full max-w-sm items-center">
				<ComboboxInput
					:placeholder="`Search ${label}...`"
					class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10" />
				<span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
					<Search class="size-4 text-muted-foreground" />
				</span>
			</div>

			<ComboboxGroup
				v-if="list.length <= 0"
				class="min-h-10 grid place-items-center text-sm text-gray-300">
				No data
			</ComboboxGroup>
			<ComboboxEmpty v-else-if="isSearch"> No framework found.</ComboboxEmpty>

			<ScrollArea class="max-h-[300px] p-1 overflow-y-auto">
				<ComboboxGroup v-if="list.length > 0">
					<ComboboxItem
						v-for="item in list"
						:key="item.value"
						:value="item"
						class="rounded-xl">
						{{ item.label }}

						<ComboboxItemIndicator>
							<Check :class="cn('ml-auto h-4 w-4 text-blue-500')" />
						</ComboboxItemIndicator>
					</ComboboxItem>
				</ComboboxGroup>
			</ScrollArea>
		</ComboboxList>
	</Combobox>
</template>
