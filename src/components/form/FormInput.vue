<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { FormFieldCommon } from '@/types';
import InputWithIcon from '../common/InputWithIcon.vue';
import { FormField } from '../ui/form';
import FormControl from '../ui/form/FormControl.vue';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormErrorCustom from './FormErrorCustom.vue';
import { useVModel } from '@vueuse/core';

interface Prop extends FormFieldCommon {
	type?: string;
	icon?: any;
}

const props = defineProps<Prop>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>
<template>
	<FormField v-slot="{ componentField, errors }" :model-value="modelValue" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }} <span v-if="!required">(optional)</span></FormLabel>
			<FormControl>
				<InputWithIcon
					:class="
						cn(
							props.inputClass,
							errors.length
								? 'border-destructive focus-within:border-destructive'
								: 'focus-within:border-blue-100 ',
						)
					"
					:icon="icon"
					:model-value="modelValue"
					:placeholder="placeholder"
					:type="type"
					v-bind="componentField" />
			</FormControl>

			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
