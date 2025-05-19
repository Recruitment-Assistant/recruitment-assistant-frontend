<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { useVModel } from '@vueuse/core';
import QuillEditor from '../common/QuillEditor.vue';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends Omit<FormFieldCommon, 'modelValue' | 'defaultValue'> {
	modelValue?: string[] | string;
	defaultValue?: string[];
}

const props = defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string[] | undefined): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>
<template>
	<FormField v-slot="{ componentField }" :model-value="modelValue" :name="name">
		<FormItem>
			<FormLabel>{{ label }} <span v-if="!required">(optional)</span></FormLabel>
			<FormControl>
				<QuillEditor :placeholder="placeholder || ''" v-bind="componentField" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
