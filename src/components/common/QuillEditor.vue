<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const props = defineProps<{
	modelValue?: string[] | string;
	placeholder: string;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: string[] | undefined | string): void;
}>();

const editorRef = ref();
let quill: Quill;

onMounted(() => {
	quill = new Quill(editorRef.value, {
		theme: 'snow',
		placeholder: props.placeholder,
		modules: {
			toolbar: [
				['bold', 'italic', 'underline'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['link', 'image'],
			],
		},
	});

	if (props.modelValue) {
		try {
			const delta = JSON.parse(
				typeof props.modelValue === 'string' ? props.modelValue : props.modelValue[0],
			);
			quill.setContents(delta);
		} catch (error) {
			console.error('Failed to parse initial content for Quill:', error);
		}
	}

	quill.on('text-change', () => {
		const delta = quill.getContents();
		const data = JSON.stringify(delta);
		if (data[0] === '') {
			emit('update:modelValue', undefined);
			return;
		}
		emit('update:modelValue', data);
	});
});
</script>
<template>
	<div class="mt-2">
		<div ref="editorRef" class="min-h-[300px]" />
	</div>
</template>

<style>
.ql-toolbar {
	border-radius: 16px 16px 0px 0px;
	border: 1px solid #f0f0f0 !important;
}

.ql-container {
	border-radius: 0px 0px 16px 16px;
	border: 1px solid #f0f0f0 !important;
	border-top: none !important;
	font-size: 14px;
}

.ql-editor {
	height: 300px;
}

.ql-editor.ql-blank::before {
	font-family: 'Inter', sans-serif;
	font-style: normal;
	color: #bfbfbf;
	font-size: 14px;
}
</style>
