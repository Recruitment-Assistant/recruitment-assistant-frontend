<script setup>
import { Badge } from '@/components/ui/badge';

defineProps({
	matchingSkills: {
		type: Array,
		default: () => [],
	},
	missingSkills: {
		type: Array,
		default: () => [],
	},
	coreSkills: {
		type: Array,
		default: () => [],
	},
});
</script>

<template>
	<div class="space-y-2">
		<!-- Matching Skills -->
		<div v-if="matchingSkills.length > 0">
			<span class="text-xs text-gray-600 block mb-1">Matching Skills:</span>
			<div class="flex flex-wrap gap-1">
				<Badge
					v-for="skill in matchingSkills"
					:key="skill"
					class="bg-green-50 text-green-700 text-xs"
					variant="secondary">
					{{ skill }}
				</Badge>
			</div>
		</div>

		<!-- Missing Skills -->
		<div v-if="missingSkills.length > 0">
			<span class="text-xs text-gray-600 block mb-1">Missing Skills:</span>
			<div class="flex flex-wrap gap-1">
				<Badge
					v-for="skill in missingSkills"
					:key="skill"
					class="bg-red-50 text-red-700 text-xs"
					variant="secondary">
					{{ skill }}
				</Badge>
			</div>
		</div>

		<!-- Core Skills -->
		<div v-if="coreSkills.length > 0">
			<span class="text-xs text-gray-600 block mb-1">Core Skills:</span>
			<div class="flex flex-wrap gap-1">
				<Badge
					v-for="skill in coreSkills"
					:key="skill"
					class="bg-blue-50 text-blue-700 text-xs"
					variant="secondary">
					{{ skill }}
				</Badge>
			</div>
		</div>
	</div>
</template>
