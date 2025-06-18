<script lang="ts" setup>
import {
	Eye as EyeIcon,
	Download as DownloadIcon,
	FileText as FileTextIcon,
} from 'lucide-vue-next';
</script>

<template>
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-900">Resume</h3>
			<div class="flex gap-2">
				<button
					class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
					<EyeIcon class="w-4 h-4" />
					View Full
				</button>
				<button
					class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
					<DownloadIcon class="w-4 h-4" />
					Download
				</button>
			</div>
		</div>

		<div class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
			<FileTextIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
			<h4 class="text-lg font-medium text-gray-900 mb-2">Resume Preview</h4>
			<p class="text-gray-600 mb-4">Sarah_Chen_Resume.pdf</p>
			<p class="text-sm text-gray-500">Click "View Full" to open the complete resume</p>
		</div>
	</div>
</template>
