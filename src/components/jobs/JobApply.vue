<script lang="ts" setup>
import UploadField from '@/components/common/UploadField.vue';
import { reactive, ref } from 'vue';
import { useCustomToast } from '@/lib/customToast.ts';
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, ChevronLeft, Loader2 } from 'lucide-vue-next';
import FormInput from '../form/FormInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { type ApplyJobPayloadType, applyJobSchema } from '@/types';
import { useForm } from 'vee-validate';
import { ListSalaryCurrency, ListSalaryInterval } from '@/constants/job.constant.ts';
import { FormCombobox, FormTextarea } from '@/components/form';
import { Label } from '@/components/ui/label';
import { applyJobApi } from '@/services/job.service.ts';

const props = defineProps<{
	id?: string;
}>();

const isLoading = ref(false);
const { showToast } = useCustomToast();
const resumeFile = ref<File | null>(null);
const presetConfig = reactive({
	acceptedTypes: ['.pdf', '.doc', '.docx'],
	title: 'Upload your resume',
	description: 'Drag and drop your resume here or click to browse',
});

const formSchema = toTypedSchema(applyJobSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: ApplyJobPayloadType) => {
	if (!resumeFile.value) {
		showToast({
			type: 'error',
			message: 'Resume is required',
		});
		return;
	}

	console.log(values);

	const response = await applyJobApi(props?.id as string, values, resumeFile.value);
});

const handleFileUpload = (files: any) => {
	resumeFile.value = files.file;
};

const handleFileRemove = (fileId: number) => {
	console.log('File removed:', fileId);
};
</script>

<template>
	<div>
		<div class="flex pb-3">
			<ChevronLeft />
			<Button :size="'icon'" :variant="'link'" class="!p-0">Back</Button>
		</div>

		<form class="max-w-[500px] items-center space-y-2 mx-auto" @submit="onSubmit">
			<FormInput
				:model-value="values.full_name"
				:required="true"
				inputClass="w-full"
				label="Full Name"
				name="full_name"
				placeholder="Enter your name"
				type="text" />

			<FormInput
				:model-value="values.email"
				:required="true"
				inputClass="w-full"
				label="Email"
				name="email"
				placeholder="Enter your email address"
				type="text" />

			<FormInput
				:model-value="values.phone_number"
				:required="true"
				inputClass="w-full"
				label="Phone number"
				name="phone_number"
				placeholder="Enter your phone number"
				type="text" />

			<div class="space-y-4">
				<Label>Expected Salary</Label>
				<div class="grid grid-cols-3 gap-4">
					<FormInput
						:modelValue="values.expected_salary?.salary"
						:required="true"
						inputClass="w-full"
						label="Salary"
						name="expected_salary.salary"
						placeholder="0"
						type="number" />

					<FormCombobox
						:list="ListSalaryCurrency"
						:modelValue="values.expected_salary?.currency"
						:required="true"
						inputClass="w-full"
						label="Currency"
						list-size="md"
						name="expected_salary.currency"
						placeholder="Select currency" />

					<FormCombobox
						:list="ListSalaryInterval"
						:modelValue="values.expected_salary?.interval"
						:required="true"
						inputClass="w-full"
						label="Interval"
						list-size="md"
						name="expected_salary.interval"
						placeholder="Select interval" />
				</div>
			</div>

			<FormTextarea
				:model-value="values.cover_letter"
				label="Cover Letter (Optional)"
				name="cover_letter" />

			<UploadField
				:max-file-size="3 * 1024 * 1024"
				:multiple="false"
				v-bind="presetConfig"
				variant="compact"
				@file-upload="handleFileUpload"
				@file-remove="handleFileRemove" />

			<Button
				:disabled="isLoading"
				class="h-11 font-medium w-full bg-blue-500 hover:bg-blue-400 mt-2"
				type="submit">
				<Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
				<BriefcaseBusiness v-else class="w-4 h-4 mr-2" />
				{{ isLoading ? 'Submitting...' : 'Submit Application' }}
			</Button>
		</form>
	</div>
</template>
