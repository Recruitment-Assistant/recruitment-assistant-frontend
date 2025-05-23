<script lang="ts" setup>
import CallApiButton from '@/components/common/CallApiButton.vue';
import Description from '@/components/common/Description.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import { ZUtils } from '@/lib/validation.utils';
import router from '@/routers';
import { useAuthStore } from '@/stores/auth.store';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { Mail, MoveLeft } from 'lucide-vue-next';

const authStore = useAuthStore();

const navigateBack = () => {
	router.back();
};

const formSchema = toTypedSchema(
	z.object({
		email: ZUtils.email(),
	}),
);

const { handleSubmit } = useForm({ validationSchema: formSchema });

const onSubmit = handleSubmit(async (values) => {
	const status = await authStore.forgotPassword(values.email);
	if (status === 200) navigateEnterOTP();
});

const navigateEnterOTP = () => {
	router.push('forgot-password/enter-otp');
};
</script>
<template>
	<div>
		<Button class="text-slate-600 items-center p-2" variant="ghost" @click="navigateBack">
			<MoveLeft />
		</Button>
	</div>
	<div class="flex flex-col items-center gap-4 mt-4">
		<Title class="font-semibold">Forgot Password</Title>
		<Description>
			Enter your registered email address. We’ll send you a code to reset your password.
		</Description>
		<form id="form" class="w-full flex flex-col gap-2" @submit="onSubmit">
			<FormInput
				:icon="Mail"
				:required="true"
				class="w-full"
				label="Email"
				name="email"
				placeholder="Enter your email address" />
		</form>
		<CallApiButton
			class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3"
			form="form">
			Send OTP
		</CallApiButton>
	</div>
</template>
