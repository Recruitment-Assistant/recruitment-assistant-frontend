<script lang="ts" setup>
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { FormFieldCommon } from '@/types';
import FormErrorCustom from './FormErrorCustom.vue';

interface Prop extends FormFieldCommon {}

const props = defineProps<Prop>();
</script>

<template>
	<FormField v-slot="{ componentField }" :model-value="modelValue" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel>{{ label }}</FormLabel>
			<FormControl>
				<Textarea
					:class="cn(props.inputClass)"
					:placeholder="placeholder"
					class="resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
					v-bind="componentField" />
			</FormControl>
			<FormDescription></FormDescription>
			<FormErrorCustom class="!mt-0" />
		</FormItem>
	</FormField>
</template>
