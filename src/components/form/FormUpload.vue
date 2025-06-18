<script lang="ts" setup>
import type { FormFieldCommon } from '@/types';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import FormErrorCustom from './FormErrorCustom.vue';
import IconFromSvg from '../common/IconFromSvg.vue';
import { ref } from 'vue';
import { useCustomToast } from '@/lib/customToast';
import ProgressCircle from '../common/ProgressCircle.vue';
import Button from '../ui/button/Button.vue';
import UserAvatar from '../common/UserAvatar.vue';
import { CircleCheck, CircleX, RotateCcw, Upload, X } from 'lucide-vue-next';

interface Props extends FormFieldCommon {
	type?: 'document' | 'image';
	allowedTypes?: string[];
	maxFileSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
	type: 'image',
	allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
	maxFileSize: 10 * 1024 * 1024,
});

const emits = defineEmits<{
	(e: 'update:modelValue', value: string | File): void;
	(e: 'delete'): void;
}>();

const { showToast } = useCustomToast();

const selectedFile = ref<any>(null);
const uploadProgress = ref(0);
const error = ref<any>();

const handleFileUpload = (event: any) => {
	error.value = undefined;
	const file = event.target.files[0];
	processFile(file);
	selectedFile.value = file;
	emits('update:modelValue', selectedFile.value);
};

const processFile = (file: File) => {
	if (file.size > props.maxFileSize) {
		error.value = 1;
		uploadProgress.value = 0;
		showToast({
			message: 'File size exceeds 10MB.',
			type: 'error',
		});
	}

	const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
	if (!props.allowedTypes.includes(fileExtension)) {
		error.value = 1;
		showToast({
			message: 'Invalid file type!',
			type: 'error',
		});
		return;
	}
};

const handleRemoveFile = () => {
	selectedFile.value = null;
	emits('delete');
};

const handleDrop = (event: DragEvent) => {
	event.preventDefault();
	error.value = undefined;

	const file = event.dataTransfer?.files[0];
	processFile(file as File);
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDragLeave = (event: DragEvent) => {
	event.preventDefault();
};
</script>
<template>
	<FormField :name="name">
		<FormItem class="flex flex-col gap-2">
			<h6 class="text-sm font-medium">{{ label }}</h6>
			<div v-if="error" class="flex gap-2 items-center px-4 py-2 bg-red-50 rounded-2xl">
				<IconFromSvg :icon="CircleX" class="text-red-500" />
				<div class="flex-1 flex flex-col gap-1">
					<p class="text-sm text-black">{{ selectedFile?.name }}</p>
					<p class="text-sm text-red-500">Failed</p>
				</div>
				<Button class="p-0 hover:bg-red-50" type="button" variant="ghost">
					<IconFromSvg :icon="RotateCcw" class="text-red-500" />
				</Button>
			</div>
			<div
				v-else-if="selectedFile && uploadProgress === 0"
				class="flex gap-2 items-center px-4 py-2 rounded-2xl border">
				<IconFromSvg :icon="CircleCheck" class="text-green-500" />
				<UserAvatar v-if="type === 'photo'" class="w-10 h-10 rounded-xl" />
				<p class="text-sm text-black flex-1">{{ selectedFile?.name }}</p>
				<Button
					class="p-0 hover:bg-white"
					type="button"
					variant="ghost"
					@click="handleRemoveFile">
					<IconFromSvg :icon="X" />
				</Button>
			</div>
			<div v-if="selectedFile && uploadProgress === 0" class="text-center !mt-0">or</div>
			<div v-if="selectedFile && uploadProgress === 0" class="flex justify-center !mt-0">
				<FormLabel class="w-fit hover:cursor-pointer !text-slate-600">
					<div class="border rounded-2xl p-3">Choose new file</div>
				</FormLabel>
			</div>
			<FormLabel
				v-else
				class="!mt-0 hover:cursor-pointer !text-slate-600"
				@dragleave="handleDragLeave"
				@dragover="handleDragOver"
				@drop="handleDrop">
				<div
					class="border border-dashed h-36 rounded-2xl grid place-items-center hover:bg-slate-50 hover:border-blue-100">
					<div v-if="selectedFile" class="flex flex-col items-center gap-2">
						<ProgressCircle :progress="uploadProgress" />
						<p class="text-center">Uploading {{ selectedFile?.name }}</p>
						<p class="text-gray-200 text-xs font-normal">
							<span>{{ Math.floor(selectedFile?.size / 1024) }}</span> KB -
							<span>{{ uploadProgress }}</span
							>% completed
						</p>
					</div>
					<div v-else class="flex flex-col items-center gap-2">
						<div class="w-10 h-10 bg-gray-50 rounded-xl grid place-items-center">
							<IconFromSvg :icon="Upload" class="!w-6 !h-6" />
						</div>
						<p><span class="text-blue-500">Choose file</span>, or drag and drop</p>
						<p class="text-gray-200 font-normal">
							Max file size 10MB. Only .png, .pdf, .doc or .docx
						</p>
					</div>
				</div>
			</FormLabel>
			<FormControl>
				<input class="hidden" type="file" @change="handleFileUpload" />
			</FormControl>
			<FormErrorCustom />
		</FormItem>
	</FormField>
</template>
