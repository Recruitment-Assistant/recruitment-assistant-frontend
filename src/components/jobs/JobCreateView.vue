<script lang="ts" setup>
import { ref } from 'vue';
import { useJobStore } from '@/stores/job.store.ts';
import JobDetailsPanel from './JobDetailsPanel.vue';
import JobForm from './JobForm.vue';

const jobStore = useJobStore();
const isResizing = ref(false);
const leftPanelWidth = ref(66.666); // Default 2/3 width in percentage
const startX = ref(0);
const startLeftWidth = ref(0);

// Resize panel functionality
const startResize = (e: MouseEvent) => {
	isResizing.value = true;
	startX.value = e.clientX;
	startLeftWidth.value = leftPanelWidth.value;

	document.addEventListener('mousemove', handleResize);
	document.addEventListener('mouseup', stopResize);
	document.body.style.cursor = 'col-resize';
	document.body.style.userSelect = 'none';
};

const handleResize = (e: MouseEvent) => {
	if (!isResizing.value) return;

	const container = document.querySelector('.resizable-container')?.getBoundingClientRect();
	if (!container) return;

	const dx = e.clientX - startX.value;
	const newWidthPercent = startLeftWidth.value + (dx / container.width) * 100;

	// Constrain between 30% and 70%
	leftPanelWidth.value = Math.min(Math.max(newWidthPercent, 30), 70);
};

const stopResize = () => {
	isResizing.value = false;
	document.removeEventListener('mousemove', handleResize);
	document.removeEventListener('mouseup', stopResize);
	document.body.style.cursor = '';
	document.body.style.userSelect = '';
};
</script>

<template>
	<div class="resizable-container flex h-[calc(100vh-6rem)]">
		<!-- Left Panel: Job Form -->
		<JobForm
			:style="{ width: `${leftPanelWidth}%` }"
			class="transition-width duration-75 ease-in-out relative overflow-y-auto" />

		<!-- Resize Handle -->
		<div
			class="resize-handle flex items-center justify-center cursor-col-resize z-10 w-4 hover:bg-muted/80 active:bg-primary/20 transition-colors"
			@mousedown="startResize">
			<div class="w-0.5 h-8 bg-border rounded-full"></div>
		</div>

		<!-- Right Panel: Job Preview -->
		<JobDetailsPanel
			:style="{ width: `${100 - leftPanelWidth}%` }"
			class="transition-width duration-75 ease-in-out" />
	</div>
</template>

<style scoped>
.transition-width {
	transition: width 0.1s ease-out;
}

/* Disable transition during resize for better performance */
.resizable-container:has(.resize-handle:active) .transition-width {
	transition: none;
}
</style>
