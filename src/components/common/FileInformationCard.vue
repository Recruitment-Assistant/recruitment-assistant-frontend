<script setup>
import { FileText } from 'lucide-vue-next';
import { formatFileSize } from '../../lib/utils.js';

defineProps({
	fileInfo: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="bg-white/80 p-3 rounded-lg border border-gray-200">
		<h4 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
			<FileText class="h-4 w-4 mr-2" />
			File Information
		</h4>
		<div class="grid grid-cols-2 gap-2 text-xs">
			<div>
				<span class="text-gray-600">File:</span>
				<span class="ml-1 font-medium">{{ fileInfo.original_filename }}</span>
			</div>
			<div>
				<span class="text-gray-600">Size:</span>
				<span class="ml-1 font-medium">{{ formatFileSize(fileInfo.bytes) }}</span>
			</div>
			<div>
				<span class="text-gray-600">Format:</span>
				<span class="ml-1 font-medium uppercase">{{ fileInfo.format }}</span>
			</div>
		</div>
	</div>
</template>
