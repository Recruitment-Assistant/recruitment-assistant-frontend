<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { ComboboxType, FormFieldCommon } from '@/types';
import CommonCombobox from '../common/CommonCombobox.vue';
import { FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue'> {
	modelValue?: string | string[];
	list: ComboboxType[];
	multiple?: boolean;
	listSize?: 'sm' | 'md' | 'lg';
	isSearch?: boolean;
}

const props = defineProps<Prop>();
</script>
<template>
	<FormField v-slot="{ componentField, errors }" :model-value="modelValue" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }} <span v-if="!required">(optional)</span></FormLabel>
			<CommonCombobox
				:class="cn(errors.length > 0 && 'border-destructive', props.class)"
				:icon="icon"
				:is-form="true"
				:is-search="isSearch"
				:label="label"
				:list="list"
				:list-size="listSize"
				:model-value="componentField.modelValue"
				:multiple="multiple"
				@update:modelValue="componentField.onChange" />
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
