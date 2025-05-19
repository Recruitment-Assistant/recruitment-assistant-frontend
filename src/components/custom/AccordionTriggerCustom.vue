<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps<
	AccordionTriggerProps & { isSmall?: boolean; class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<AccordionHeader class="flex">
		<AccordionTrigger
			:class="
				cn(
					'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
					props.class,
				)
			"
			v-bind="delegatedProps">
			<slot />
			<slot v-if="isSmall" name="icon">
				<ChevronDown class="transition-transform duration-200" />
			</slot>
		</AccordionTrigger>
	</AccordionHeader>
</template>
