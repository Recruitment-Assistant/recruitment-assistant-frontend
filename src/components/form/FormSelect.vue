<script lang="ts" setup>
import {
	Combobox,
	ComboboxAnchor,
	ComboboxGroup,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxList,
	ComboboxTrigger,
} from '@/components/ui/combobox';
import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { ComboboxType, FormFieldCommon } from '@/types';
import { Check, ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import FormErrorCustom from './FormErrorCustom.vue';
import ComboboxInput from '../ui/combobox/ComboboxInput.vue';
import ComboboxEmpty from '../ui/combobox/ComboboxEmpty.vue';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	list: ComboboxType[];
	modelValue?: string | string[];
	multiple?: boolean;
	isSearch?: boolean;
	list_size?: 'small' | 'medium' | 'large';
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(
		e: 'update:modelValue',
		payload: { fieldName: string; data: string | string[] | undefined },
	): void;
}>();

const open = ref(false);
const comboboxInput = ref(props.placeholder ? props.placeholder : 'Select');

const handleSelect = (value: any, fieldName: string) => {
	if (props.multiple) {
		const data = (value as ComboboxType[]).map((item) => item.value);
		emit('update:modelValue', { fieldName: fieldName, data: data ? data : undefined });
		comboboxInput.value = data.length > 0 ? `${data.length} Selected` : props.placeholder || '';
		return;
	}
	const data = value as ComboboxType;
	comboboxInput.value = data.label;
	emit('update:modelValue', { fieldName, data: data.value });
};

const handleOpen = (value: boolean) => {
	open.value = value;
};
</script>
<template>
	<FormField v-slot="{ errors, field }" :model-value="modelValue" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }} <span v-if="!required">(optional)</span></FormLabel>

			<Combobox
				:multiple="multiple"
				@update:model-value="(value: any) => handleSelect(value, field.name)"
				@update:open="handleOpen">
				<FormControl>
					<ComboboxAnchor class="w-full">
						<div
							v-if="isSearch"
							class="relative w-full max-w-sm items-center text-gray-200">
							<span
								class="absolute start-0 flex items-center justify-center px-3 h-full">
								<component v-if="icon" :icon="icon" />
							</span>
							<ComboboxInput
								:class="
									cn(
										'rounded-2xl p-3 h-auto !pl-10 focus:border-blue-100 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 text-slate-600',
										props.inputClass,
										errors.length > 0 && 'border-destructive',
									)
								"
								:display-value="(val) => val?.label ?? ''"
								:placeholder="comboboxInput" />
							<ComboboxTrigger
								class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
								<ChevronDown
									:class="open ? 'rotate-180' : 'rotate-0'"
									class="transition-all duration-200" />
							</ComboboxTrigger>
						</div>
						<ComboboxTrigger v-else class="relative w-full items-center">
							<span
								class="absolute start-0 inset-y-0 flex items-center justify-center ml-3 text-gray-200">
								<component :is="icon" v-if="icon" />
							</span>
							<Button
								:class="[
									cn(
										'rounded-2xl p-3 w-full font-normal border justify-start h-auto focus:border-blue-100 text-gray-200 hover:text-gray-200',
										props.inputClass,
									),
									icon ? 'pl-10' : '',
									comboboxInput !== '' && comboboxInput !== placeholder
										? 'text-slate-600 hover:text-slate-600'
										: '',
									errors.length > 0 && 'border-destructive',
								]"
								type="button"
								variant="outline">
								{{ comboboxInput }}
							</Button>
							<span
								class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
								<ChevronDown :class="open ? 'rotate-180' : 'rotate-0'" />
							</span>
						</ComboboxTrigger>
					</ComboboxAnchor>
				</FormControl>

				<ComboboxList
					:class="
						cn(
							'w-[300px] rounded-2xl',
							list_size === 'small' && 'w-[300px]',
							list_size === 'medium' && 'w-[500px]',
							list_size === 'large' && 'w-[700px]',
						)
					">
					<ComboboxGroup
						v-if="list.length === 0"
						class="text-sm min-h-20 grid place-items-center">
						No data
					</ComboboxGroup>
					<ComboboxEmpty v-else> Nothing found.</ComboboxEmpty>
					<ComboboxGroup v-if="list.length > 0">
						<ScrollArea class="max-h-[300px] overflow-auto">
							<ComboboxItem
								v-for="item in list"
								:key="item.value"
								:value="item"
								class="hover:bg-muted rounded-2xl py-2">
								{{ item.label }}

								<ComboboxItemIndicator>
									<Check :class="cn('ml-auto h-4 w-4')" />
								</ComboboxItemIndicator>
							</ComboboxItem>
						</ScrollArea>
					</ComboboxGroup>
				</ComboboxList>
			</Combobox>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
