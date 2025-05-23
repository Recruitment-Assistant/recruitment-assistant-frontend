<script lang="ts" setup>
import { Contact } from 'lucide-vue-next';

defineProps({
	resumeData: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="bg-white/80 p-3 rounded-lg border border-gray-200">
		<h4 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
			<Contact class="h-4 w-4 mr-2" />
			Contact Information
		</h4>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
			<div v-if="resumeData.email">
				<span class="text-gray-600">Email:</span>
				<span class="ml-1">{{ resumeData.email }}</span>
			</div>
			<div v-if="resumeData.phone">
				<span class="text-gray-600">Phone:</span>
				<span class="ml-1">{{ resumeData.phone }}</span>
			</div>
			<div v-if="resumeData.linkedin" class="col-span-full">
				<span class="text-gray-600">LinkedIn:</span>
				<a
					:href="resumeData.linkedin"
					class="ml-1 text-blue-600 hover:underline"
					target="_blank">
					{{ resumeData.linkedin }}
				</a>
			</div>
			<div v-if="resumeData.address" class="col-span-full">
				<span class="text-gray-600">Address:</span>
				<span class="ml-1">{{ resumeData.address }}</span>
			</div>
		</div>
	</div>
</template>
