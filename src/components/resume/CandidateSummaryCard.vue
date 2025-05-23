<script lang="ts" setup>
import { User } from 'lucide-vue-next';

defineProps({
	summary: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="bg-white/80 p-3 rounded-lg border border-gray-200">
		<h4 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
			<User class="h-4 w-4 mr-2" />
			Candidate Summary
		</h4>
		<div class="space-y-2">
			<div class="grid grid-cols-2 gap-2 text-xs">
				<div>
					<span class="text-gray-600">Name:</span>
					<span class="ml-1 font-medium">{{ summary.full_name }}</span>
				</div>
				<div>
					<span class="text-gray-600">Experience:</span>
					<span class="ml-1 font-medium">{{ summary.total_experience_years }} years</span>
				</div>
				<div>
					<span class="text-gray-600">Recent Role:</span>
					<span class="ml-1 font-medium">{{ summary.recent_job_title }}</span>
				</div>
				<div>
					<span class="text-gray-600">Company:</span>
					<span class="ml-1 font-medium">{{ summary.recent_company }}</span>
				</div>
			</div>
			<div class="text-xs">
				<span class="text-gray-600">Education:</span>
				<span class="ml-1">{{ summary.education }}</span>
			</div>
		</div>
	</div>
</template>
