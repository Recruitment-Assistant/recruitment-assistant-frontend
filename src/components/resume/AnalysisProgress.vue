<script lang="ts" setup>
import { Progress } from '@/components/ui/progress';
import { computed } from 'vue';

const props = defineProps({
	progress: {
		type: Number,
		default: 0,
	},
	stageLabel: {
		type: String,
		default: '',
	},
	details: {
		type: Object,
		default: () => ({
			message: '',
			completedSteps: 0,
			totalSteps: 0,
		}),
	},
});

const progress = computed(() => {
	console.log(props.progress);
	return props.progress;
});
</script>

<template>
	<div class="space-y-2">
		<!-- Progress Bar -->
		<div class="space-y-2">
			<div class="flex justify-between items-center text-xs text-muted-foreground">
				<span>{{ stageLabel }}</span>
				<span class="font-medium">{{ progress }}%</span>
			</div>
			<Progress :value="progress" class="h-2 bg-gray-200" />
		</div>

		<!-- Current Step Details -->
		<div
			v-if="details.message"
			class="text-xs text-muted-foreground bg-white/60 p-2 rounded border border-gray-200">
			{{ details.message }}
			<span v-if="details.totalSteps > 0" class="ml-2 font-medium">
				({{ details.completedSteps }}/{{ details.totalSteps }})
			</span>
		</div>
	</div>
</template>
