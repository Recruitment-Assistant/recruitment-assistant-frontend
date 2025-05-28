<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
	TagsInput,
	TagsInputInput,
	TagsInputItem,
	TagsInputItemDelete,
	TagsInputItemText,
} from '@/components/ui/tags-input/index.ts';
import { cn } from '@/lib/utils.ts';

interface Props extends FormFieldCommon {
	maxTags?: number;
	disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
	<FormField v-slot="{ componentField }" :name="name">
		<FormItem>
			<FormLabel v-if="label">{{ label }}</FormLabel>
			<FormControl>
				<TagsInput
					:class="cn('min-h-10', inputClass)"
					:disabled="disabled"
					:model-value="componentField.modelValue"
					@update:model-value="componentField['onUpdate:modelValue']">
					<div class="flex gap-1 flex-wrap items-center">
						<TagsInputItem
							v-for="item in modelValue"
							:key="item"
							:value="item"
							class="data-[state=active]:bg-muted">
							<TagsInputItemText />
							<TagsInputItemDelete />
						</TagsInputItem>
					</div>
					<TagsInputInput
						:class="
							cn(
								'flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
								inputClass,
							)
						"
						:placeholder="placeholder" />
				</TagsInput>
			</FormControl>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
