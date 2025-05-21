<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { type JobPayloadType, jobSchema } from '@/types/jobs/job.schema.ts';
import { useForm } from 'vee-validate';
import type { Job } from '@/types/jobs/job.ts';
import { Sheet, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { useJobStore } from '@/stores/job.store.ts';
import { Input } from '@/components/ui/input';
import SheetContentCustom from '@/components/custom/SheetContentCustom.vue';
import CallApiButton from '@/components/common/CallApiButton.vue';
import FormMarkdown from '@/components/form/FormMarkdown.vue';
import { FormInput, FormSelect } from '@/components/form';
import { ListEmploymentType } from '@/constants/job.constant.ts';
import { useDepartment } from '@/composables/department.ts';
import { usePosition } from '@/composables/position.ts';
import type { ComboboxType } from '@/types';
import { computed } from 'vue';
import FormTagsInput from '@/components/form/FormTagsInput.vue';

interface Props {
	modelValue: boolean;
	data?: Job;
}

defineProps<Props>();

const emit = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const jobStore = useJobStore();

const { data: departments } = useDepartment();
const { data: positions } = usePosition();

const listDepartment = computed<ComboboxType[]>(
	() =>
		departments.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);

const listPosition = computed<ComboboxType[]>(
	() =>
		positions.value?.map((item) => ({
			label: item.title,
			value: item.id,
		})) || [],
);

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: JobPayloadType) => {
	console.log(values);
});

const handleOpen = (open: boolean) => {
	emit('update:open', open);
};
</script>
<template>
	<Sheet :open="modelValue" @update:open="handleOpen">
		<SheetContentCustom class="rounded-l-3xl sm:max-w-[880px] p-8 flex flex-col text-slate-600">
			<ScrollArea class="flex-1 pr-3">
				<form id="form" @submit="onSubmit">
					<FormField v-slot="{ componentField }" :modelValue="data?.title" name="title">
						<FormItem>
							<FormControl>
								<Input
									class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] text-black px-0 placeholder:text-gray-200 font-semibold p-2"
									placeholder="Enter job title"
									v-bind="componentField" />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					</FormField>

					<SheetHeader>
						<SheetTitle></SheetTitle>
						<SheetDescription />
					</SheetHeader>

					<div class="grid grid-cols-2 gap-6">
						<FormInput
							:model-value="data?.job_code"
							:required="true"
							class="w-full"
							label="Job Code"
							name="job_code"
							placeholder="Enter job code" />

						<FormInput
							:modelValue="data?.location"
							:required="true"
							class="w-full"
							label="Location"
							name="location"
							placeholder="Da Nang" />

						<FormInput
							:modelValue="data?.quantity"
							:required="true"
							class="w-full"
							label="Quantity"
							name="quantity"
							placeholder="Enter quantity"
							type="number" />

						<FormSelect
							:list="ListEmploymentType"
							:modelValue="data?.employment_type"
							:required="true"
							label="Employment type"
							list-size="md"
							name="employment_type"
							placeholder="Select employment type" />

						<FormSelect
							:list="listDepartment"
							:modelValue="data?.department_id"
							:required="true"
							label="Department"
							list-size="md"
							name="department_id"
							placeholder="Select department" />

						<FormSelect
							:list="listPosition"
							:modelValue="data?.position_id"
							:required="true"
							label="Position"
							list-size="md"
							name="position_id"
							placeholder="Select position" />

						<FormTagsInput
							:modelValue="data?.tags"
							:required="true"
							label="Tags"
							name="tags"
							placeholder="Tags" />
					</div>

					<div class="mt-6 grid gap-4">
						<FormMarkdown
							:model-value="data?.description"
							class="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72"
							label="Job description"
							name="description"
							placeholder="A detailed job description" />

						<FormMarkdown
							:model-value="data?.requirements"
							:required="true"
							label="Requirements"
							name="requirements"
							placeholder="Enter requirements" />
					</div>
				</form>
			</ScrollArea>

			<div class="text-end mt-4">
				<CallApiButton
					:isLoading="jobStore.state.loading"
					class="bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white"
					form="form">
					{{ data ? 'Save' : 'Create' }}
				</CallApiButton>
			</div>
		</SheetContentCustom>
	</Sheet>
</template>

<style scoped></style>
