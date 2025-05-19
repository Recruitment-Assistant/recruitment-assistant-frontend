<script lang="ts" setup>
import Description from '@/components/common/Description.vue';
import Title from '@/components/common/Title.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/ui/button/Button.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Label from '@/components/ui/label/Label.vue';
import router from '@/routers';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { loginSchema } from './LoginSchema';
import CallApiButton from '@/components/common/CallApiButton.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
import { Lock, Mail } from 'lucide-vue-next';

const authStore = useAuthStore();

const remember = ref(true);

const navigateForgotPassword = () => {
	router.push('/auth/forgot-password');
};

const formSchema = toTypedSchema(loginSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	const status = await authStore.login(values, remember.value);
	if (status === 200) {
		router.push('/');
	}
});
</script>
<template>
	<div class="flex flex-col items-center gap-4">
		<Title class="text-2xl">Welcome to Recruitment Assistant!</Title>
		<Description class="self-start text-sm">Login with your email and password.</Description>

		<form autocomplete="off" class="w-full" @submit="onSubmit">
			<FormInput
				:icon="Mail"
				:model-value="values.email"
				:required="true"
				class="w-full"
				label="Email"
				name="email"
				placeholder="Enter your email address"
				type="text" />
			<FormInput
				:icon="Lock"
				:model-value="values.password"
				:required="true"
				class="w-full"
				label="Password"
				name="password"
				placeholder="Enter your password"
				type="password" />

			<div class="self-start w-full flex justify-between px-2">
				<div class="flex items-center space-x-2 text-gray-400">
					<Checkbox
						id="remember"
						v-model="remember"
						class="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
					<Label
						class="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						for="remember">
						Remember me
					</Label>
				</div>
				<Button
					class="text-blue-500 p-0 text-sm"
					type="button"
					variant="link"
					@click="navigateForgotPassword">
					Forgot password?
				</Button>
			</div>

			<CallApiButton
				:is-loading="authStore.isLoading"
				class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 h-auto p-3">
				Login
			</CallApiButton>
		</form>

		<div class="flex items-center gap-1 text-sm">
			<p>Don't have an account.</p>
			<RouterLink class="text-blue-500 p-0" to="/register"> Register</RouterLink>
		</div>
	</div>
</template>
