<script lang="ts" setup>
import { Badge } from '@/components/ui/badge';
import { AlertCircle, BarChart, CheckCircleIcon, Clock } from 'lucide-vue-next';

defineProps({
	analysisStage: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-medium flex items-center">
			<BarChart class="h-4 w-4 mr-2 text-primary" />
			Resume Analysis
		</h3>
		<div class="flex items-center space-x-2">
			<Badge
				v-if="analysisStage === 'complete'"
				class="bg-green-100 text-green-800"
				variant="default">
				<CheckCircleIcon class="h-3 w-3 mr-1" />
				Complete
			</Badge>
			<Badge v-else-if="analysisStage === 'failed'" variant="destructive">
				<AlertCircle class="h-3 w-3 mr-1" />
				Failed
			</Badge>
			<Badge v-else class="bg-blue-100 text-blue-800" variant="secondary">
				<Clock class="h-3 w-3 mr-1" />
				Processing
			</Badge>
		</div>
	</div>
</template>
