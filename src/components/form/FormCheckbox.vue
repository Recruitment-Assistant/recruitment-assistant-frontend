<script lang="ts" setup>
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { FormFieldCommon } from '@/types';
import FormErrorCustom from './FormErrorCustom.vue';

interface Props extends FormFieldCommon {
	checked?: boolean;
	disabled?: boolean;
	description?: string;
}

defineProps<Props>();
</script>

<template>
	<FormField v-slot="{ value, handleChange }" :name="name" type="checkbox">
		<FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md cursor-pointer">
			<FormControl>
				<Checkbox
					:disabled="disabled"
					:model-value="value"
					@update:model-value="handleChange" />
			</FormControl>
			<div class="space-y-1 leading-none cursor-pointer">
				<FormLabel>{{ label }}</FormLabel>
				<FormDescription>
					{{ description }}
				</FormDescription>
				<FormErrorCustom class="!mt-0" />
			</div>
		</FormItem>
	</FormField>
</template>
