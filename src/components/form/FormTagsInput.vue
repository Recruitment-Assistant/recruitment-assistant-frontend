<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';
import { useVModel } from '@vueuse/core';
import {
	TagsInput,
	TagsInputItem,
	TagsInputItemDelete,
	TagsInputItemText,
} from '@/components/ui/tags-input';

interface Prop extends FormFieldCommon {
	maxTags?: number;
}

const props = withDefaults(defineProps<Prop>(), {
	maxTags: 10,
	placeholder: 'Type and press enter...',
});

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string[]): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue || [],
});
</script>

<template>
	<FormField v-slot="{ componentField, errors }" :model-value="modelValue" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }} <span v-if="!required">(optional)</span></FormLabel>
			<FormControl>
				<TagsInput
					:model-value="componentField.modelValue"
					@update:model-value="componentField['onUpdate:modelValue']">
					<TagsInputItem
						v-for="item in componentField.modelValue"
						:key="item"
						:value="item">
						<TagsInputItemText />
						<TagsInputItemDelete />
					</TagsInputItem>

					<TagsInput :placeholder="placeholder" />
				</TagsInput>
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
