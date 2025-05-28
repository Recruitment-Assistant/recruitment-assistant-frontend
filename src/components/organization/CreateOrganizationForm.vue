<script lang="ts" setup>
import { Building2, Loader2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import { type CreateOrganizationPayload, organizationSchema } from '@/types';
import { useForm } from 'vee-validate';
import { FormInput, FormTextarea, FormUpload } from '@/components/form';
import { useAuthStore } from '@/stores/auth.store.ts';
import { useCustomToast } from '@/lib/customToast.ts';
import router from '@/routers';
import { uploadFileApi } from '@/services/file.service.ts';

const authStore = useAuthStore();

const { showToast } = useCustomToast();
const isLoading = ref(false);
const fileUpload = ref<File>();
const formSchema = toTypedSchema(organizationSchema);

const { handleSubmit, values, setFieldValue } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: CreateOrganizationPayload) => {
	if (fileUpload.value) {
		const formData = new FormData();
		formData.append('file', fileUpload.value);
		const { data } = await uploadFileApi(formData);
		setFieldValue('logo_url', data.url);
	}

	const statusCode = await authStore.initOrganizationContext(values);
	if ([200, 201].includes(statusCode)) {
		router.push('/');
		showToast({
			message: 'Create organization successfully',
			description: 'Create organization successfully',
			type: 'success',
		});
	}
});

const handleFileUpload = (file: File) => {
	fileUpload.value = file;
};

const handleRemoveFile = () => {
	fileUpload.value = null;
};
</script>

<template>
	<form class="space-y-2" @submit="onSubmit">
		<FormInput
			:model-value="values.name"
			:required="true"
			inputClass="w-full"
			label="Organization Name *"
			name="name"
			placeholder="Enter organization name" />

		<FormInput
			:model-value="values.address"
			:required="true"
			inputClass="w-full"
			label="Address"
			name="address"
			placeholder="Enter organization address" />

		<FormTextarea
			:model-value="values.description"
			:required="true"
			inputClass="w-full"
			label="Description (Optional)"
			name="description"
			placeholder="Brief description of your organization" />

		<FormUpload
			:model-value="fileUpload"
			label="Logo (Optional)"
			name="logo_url"
			placeholder="Upload"
			type="image"
			@delete="handleRemoveFile"
			@update:model-value="handleFileUpload" />

		<Button
			:disabled="isLoading || !values.name"
			class="w-full h-11 font-medium hover:bg-blue-500"
			type="submit">
			<Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
			<Building2 v-else class="w-4 h-4 mr-2" />
			{{ isLoading ? 'Creating...' : 'Create Organization' }}
		</Button>
	</form>
</template>

<style scoped></style>
