<script lang="ts" setup>
import Textarea from '../ui/textarea/Textarea.vue';
import { useField } from 'vee-validate';
import ErrorMessage from './ErrorMessage.vue';
import { onBeforeMount, type Ref } from 'vue';

const props = defineProps<{
	name: string;
	type: string;
	placeholder: string;
	required?: boolean;
	initialValue?: string;
}>();

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name) as any as {
	value: Ref<string>;
	errorMessage: string;
};

onBeforeMount(() => {
	if (props.initialValue) {
		value.value = props.initialValue;
	}
});
</script>
<template>
	<Textarea v-model="value" :invalid="errorMessage" v-bind="{ ...$props, ...$attrs }" />
	<ErrorMessage :error="errorMessage" class="mt-1 text-xs" />
</template>
