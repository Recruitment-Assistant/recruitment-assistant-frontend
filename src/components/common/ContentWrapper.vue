<script lang="ts" setup>
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Prop {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Prop>();
</script>
<template>
	<section :class="cn('bg-background rounded-xl !p-0 transition-all duration-300', props.class)">
		<slot />
	</section>
</template>
