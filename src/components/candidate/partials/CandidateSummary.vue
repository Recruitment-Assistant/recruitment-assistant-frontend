<script lang="ts" setup>
import type { ICandidate } from '@/types/candidate';

interface Props {
	candidate: ICandidate;
}
defineProps<Props>();
</script>

<template>
	<div class="space-y-8">
		<div>
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
			<p class="text-gray-700 leading-relaxed">{{ candidate?.summary }}</p>
		</div>

		<div>
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
			<div class="flex flex-wrap gap-2">
				<span
					v-for="(skill, index) in candidate?.skills"
					:key="index"
					class="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
					{{ skill }}
				</span>
			</div>
		</div>
	</div>
</template>
