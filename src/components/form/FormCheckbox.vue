<script lang="ts" setup>
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { FormFieldCommon } from '@/types';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends FormFieldCommon {
	checked?: boolean;
	disabled?: boolean;
	id?: string;
	description?: string;
}

const props = defineProps<Prop>();
</script>

<template>
	<FormField v-slot="{ componentField }" :model-value="modelValue" :name="name">
		<FormItem class="flex flex-row items-start space-x-3 space-y-0">
			<FormControl>
				<Checkbox
					:id="id || name"
					:checked="checked"
					:class="cn(props.class)"
					:disabled="disabled"
					v-bind="componentField" />
			</FormControl>
			<div class="space-y-1 leading-none">
				<FormLabel v-if="label" :for="id || name" class="cursor-pointer">
					{{ label }}
				</FormLabel>
				<FormDescription
					v-if="$slots.description || description"
					class="text-muted-foreground">
					<slot name="description">{{ description }}</slot>
				</FormDescription>
			</div>
			<FormErrorCustom class="!mt-0" />
		</FormItem>
	</FormField>
</template>
