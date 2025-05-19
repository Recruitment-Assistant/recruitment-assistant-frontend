<script lang="ts" setup>
import { Input } from '../ui/input';
import { useField } from 'vee-validate';
import { onBeforeMount, type Ref } from 'vue';
import { Info } from 'lucide-vue-next';
import ErrorMessage from './ErrorMessage.vue';

const props = defineProps<{
	name: string;
	type: string;
	placeholder: string;
	required?: boolean;
	initialValue?: string;
}>();

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
	<Input v-model="value" :invalid="errorMessage" v-bind="{ ...$props, ...$attrs }" />
	<div class="text-destructive mt-0.5">
		<Info :size="16" />
	</div>
	<ErrorMessage />
</template>
