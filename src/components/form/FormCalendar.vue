<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateValueToLocalDate } from '@/lib/utils';
import { type DateValue } from '@internationalized/date';
import { type HTMLAttributes, ref } from 'vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import CalendarCustom from '../custom/CalendarCustom.vue';
import type { FormFieldCommon } from '@/types';
import FormErrorCustom from './FormErrorCustom.vue';
import { Calendar, ChevronDown } from 'lucide-vue-next';

interface Prop extends FormFieldCommon {
	inputClass?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();

const emit = defineEmits<{
	(e: 'update:value', payload: { fieldName: string; data: string | undefined }): void;
}>();

const placeholder = ref();
const value = ref<DateValue>();
const isOpen = ref(false);

const handlePick = (fieldName: string) => {
	emit('update:value', { fieldName, data: value.value?.toString() });
};

const handleOpen = (open: boolean) => {
	isOpen.value = open;
};
</script>

<template>
	<FormField v-slot="{ errors, field }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }}</FormLabel>
			<Popover :open="isOpen" @update:open="handleOpen">
				<PopoverTrigger as-child>
					<FormControl>
						<Button
							:class="
								cn(
									'w-[240px] gap-3 ps-3 p-3 h-auto text-start font-normal rounded-2xl border justify-start focus:border-blue-200',
									!value && 'text-muted-foreground',
									errors.length > 0 && 'border-destructive',
									props.inputClass,
								)
							"
							variant="outline">
							<IconFromSvg :icon="Calendar" class="text-gray-200" />
							<span
								:class="[
									value ? 'text-slate-600' : 'text-gray-200',
									'flex-1 font-normal',
								]"
								>{{
									value ? formatDateValueToLocalDate(value) : 'dd/MM/yyyy'
								}}</span
							>
							<span>
								<IconFromSvg
									:class="[isOpen ? 'rotate-180' : 'rotate-0', 'duration-200']"
									:icon="ChevronDown" />
							</span>
						</Button>
						<input hidden />
					</FormControl>
				</PopoverTrigger>
				<PopoverContent class="w-auto p-0 rounded-2xl">
					<CalendarCustom
						v-model="value"
						v-model:placeholder="placeholder"
						calendar-label="Date of birth"
						initial-focus
						@update:model-value="handlePick(field.name)" />
				</PopoverContent>
			</Popover>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
