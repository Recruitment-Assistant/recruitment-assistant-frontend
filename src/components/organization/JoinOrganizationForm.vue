<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Loader2, UserCheck } from 'lucide-vue-next';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { FormInput } from '@/components/form';
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from 'vue';

const isLoading = ref(false);

const joinOrganizationSchema = z.object({
	invite_code: z.string().length(6, 'Invite Code Invalid'),
});

const formSchema = toTypedSchema(joinOrganizationSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	isLoading.value = true;
});
</script>

<template>
	<form class="space-y-2" @submit="onSubmit">
		<FormInput
			:model-value="values.invite_code"
			inputClass="w-full"
			label="Invite Code *"
			name="invite_code"
			placeholder="Enter your invite code" />

		<Button
			:disabled="isLoading || !values.inviteCode"
			class="w-full h-11 font-medium hover:bg-blue-500">
			<Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
			<UserCheck v-else class="w-4 h-4 mr-2" />
			{{ isLoading ? 'Joining...' : 'Join Organization' }}
		</Button>
	</form>
</template>

<style scoped></style>
