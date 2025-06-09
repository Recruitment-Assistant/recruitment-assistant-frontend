<script lang="ts" setup>
import { type HTMLAttributes, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-vue-next';

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
	placeholder?: string;
	icon?: any;
	type?: string;
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | number): void;
}>();

const showPassword = ref(false);

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props?.defaultValue,
});

const handleShowPassword = () => {
	showPassword.value = !showPassword.value;
};
</script>

<template>
	<div :class="cn('flex gap-2 border p-3 rounded-2xl w-fit items-center ', props.class)">
		<span v-if="icon" class="text-gray-200"><component :is="icon" /></span>
		<input
			v-model="modelValue"
			:placeholder="placeholder"
			:type="showPassword ? 'text' : type"
			class="focus:outline-none placeholder:text-sm placeholder:text-gray-200 w-full text-sm bg-[--backgorund]" />
		<button
			v-if="type === 'password'"
			class="text-gray-300"
			type="button"
			@click="handleShowPassword">
			<component :is="EyeClosed" v-if="!showPassword" />
			<component :is="Eye" v-else />
		</button>
	</div>
</template>
