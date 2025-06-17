<script lang="ts" setup>
import {
	FormCheckbox,
	FormCombobox,
	FormInput,
	FormMarkdown,
	FormTagsInput,
} from '@/components/form';
import { useDepartment } from '@/composables/useDepartment.ts';
import {
	JOB_STATUS,
	ListEmploymentType,
	ListSalaryCurrency,
	ListSalaryInterval,
} from '@/constants/job.constant';
import {
	type ComboboxType,
	type IJob,
	type IJobFilter,
	type JobPayloadType,
	jobSchema,
} from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import { BriefcaseBusiness, Building, Loader2, MapPin, User } from 'lucide-vue-next';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { usePipeline } from '@/composables/usePipeline.ts';
import { useCreateJob, useUpdateJob } from '@/composables/useJob.ts';

interface Props {
	open: boolean;
	data?: IJob;
	filter: IJobFilter;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: 'update:open', value: boolean): void;
}>();

const { data: departments } = useDepartment();
const { data: pipelines } = usePipeline();

const filter = computed(() => props.filter);

const listDepartment = computed<ComboboxType[]>(
	() =>
		departments.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);

const listPipeline = computed<ComboboxType[]>(
	() =>
		pipelines?.value?.data?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);

const isOpen = computed({
	get: () => props.open,
	set: (value) => emit('update:open', value),
});

const { mutateAsync: createJob, isPending: isPendingCreate } = useCreateJob(filter);
const { mutateAsync: updateJob, isPending: isPendingUpdate } = useUpdateJob(filter);

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: JobPayloadType) => {
	try {
		if (!props.data) {
			values.status = JOB_STATUS.OPENING;
		} else {
			values.status = props.data.status;
		}

		const { status_code } = !props.data
			? await createJob(values)
			: await updateJob({ id: props.data.id, payload: values });

		if ([200, 201].includes(status_code)) {
			isOpen.value = false;
		}
	} catch (error) {
		return error;
	}
});

const saveDraft = handleSubmit(async (values: JobPayloadType) => {
	values.status = JOB_STATUS.DRAFT;
	try {
		const { status_code } = await createJob(values);

		if ([200, 201].includes(status_code)) {
			isOpen.value = false;
		}
	} catch (error) {
		return error;
	}
});

const cancel = () => {
	isOpen.value = false;
};
</script>

<template>
	<ContentWrapper>
		<Dialog v-model:open="isOpen">
			<DialogContent class="sm:max-w-fit">
				<DialogHeader>
					<DialogTitle>Create Job</DialogTitle>
				</DialogHeader>

				<form @submit="onSubmit">
					<FormField
						v-slot="{ componentField }"
						:modelValue="data?.title ?? values.title"
						name="title">
						<FormItem>
							<FormControl>
								<Input
									class="focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-[28px] text-accent-foreground px-0 placeholder:text-gray-200 font-semibold p-2"
									placeholder="Enter job title"
									v-bind="componentField" />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					</FormField>

					<ScrollArea class="h-[600px]">
						<div class="grid grid-cols-2 gap-6">
							<FormInput
								:icon="MapPin"
								:modelValue="data?.location ?? values.location"
								:required="true"
								inputClass="w-full"
								label="Location"
								name="location"
								placeholder="Da Nang" />

							<FormInput
								:icon="User"
								:modelValue="data?.quantity ?? values.quantity"
								:required="true"
								inputClass="w-full"
								label="Quantity"
								name="quantity"
								placeholder="Enter quantity"
								type="number" />

							<FormCombobox
								:icon="BriefcaseBusiness"
								:list="ListEmploymentType"
								:modelValue="data?.employment_type ?? values.employment_type"
								:required="true"
								label="Employment type"
								list-size="md"
								name="employment_type"
								placeholder="Select employment type" />

							<FormCombobox
								:icon="Building"
								:list="listDepartment"
								:modelValue="data?.department_id ?? values.department_id"
								:required="true"
								label="Department"
								list-size="md"
								name="department_id"
								placeholder="Select department" />

							<FormCombobox
								:icon="Building"
								:list="listPipeline"
								:modelValue="data?.pipeline_id ?? values.pipeline_id"
								:required="true"
								label="Pipeline"
								list-size="md"
								name="pipeline_id"
								placeholder="Select pipeline" />

							<div class="flex flex-col space-y-2">
								<FormTagsInput
									:modelValue="data?.tags ?? values.tags"
									:required="true"
									label="Tags"
									name="tags"
									placeholder="Tags" />

								<FormCheckbox
									:model-value="data?.remote_eligible ?? values.remote_eligible"
									label="Remote Work Eligible"
									name="remote_eligible" />
							</div>

							<!-- Salary Range -->
							<div class="space-y-4">
								<Label class="text-base font-medium">Salary Range</Label>

								<div class="grid grid-cols-2 gap-4">
									<FormInput
										:modelValue="
											data?.salary_range?.min ?? values.salary_range?.min
										"
										:required="true"
										inputClass="w-full"
										label="Minimum"
										name="salary_range.min"
										placeholder="0"
										type="number" />
									<FormInput
										:modelValue="
											data?.salary_range?.max ?? values.salary_range?.max
										"
										:required="true"
										inputClass="w-full"
										label="Maximum"
										name="salary_range.max"
										placeholder="0"
										type="number" />
								</div>

								<div class="grid grid-cols-2 gap-4">
									<FormCombobox
										:list="ListSalaryCurrency"
										:modelValue="
											data?.salary_range?.currency ??
											values.salary_range?.currency
										"
										:required="true"
										inputClass="w-full"
										label="Currency"
										list-size="md"
										name="salary_range.currency"
										placeholder="Select currency" />

									<FormCombobox
										:list="ListSalaryInterval"
										:modelValue="
											data?.salary_range?.interval ??
											values.salary_range?.interval
										"
										:required="true"
										inputClass="w-full"
										label="Interval"
										list-size="md"
										name="salary_range.interval"
										placeholder="Select interval" />
								</div>

								<div class="grid grid-cols-2 gap-x-2 mt-2">
									<FormCheckbox
										:model-value="
											data?.salary_range?.bonus_eligible ??
											values.salary_range?.bonus_eligible
										"
										label="Bonus Eligible"
										name="bonus_eligible" />
									<FormCheckbox
										:model-value="
											data?.salary_range?.equity_offered ??
											values.salary_range?.equity_offered
										"
										label="Equity Offered"
										name="equity_offered" />
								</div>
							</div>
						</div>

						<div class="mt-6 grid gap-4">
							<FormMarkdown
								:model-value="data?.description ?? values.description"
								inputClass="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72"
								label="Job description"
								name="description"
								placeholder="A detailed job description" />

							<FormMarkdown
								:model-value="data?.requirements ?? values.requirements"
								:required="true"
								label="Requirements"
								name="requirements"
								placeholder="Enter requirements" />
						</div>
					</ScrollArea>

					<DialogFooter>
						<div v-if="!data" class="flex flex-row justify-end mt-4 gap-x-3">
							<Button
								:disabled="isPendingCreate || !values.title"
								class="bg-accent-foreground/40 hover:bg-gray-300 rounded-2xl h-auto py-3.5 px-10 text-white"
								type="button"
								@click="saveDraft">
								<Loader2 v-if="isPendingCreate" class="w-4 h-4 mr-2 animate-spin" />
								<BriefcaseBusiness v-else class="w-4 h-4 mr-2" />
								{{ isPendingCreate ? 'Saving...' : 'Save as draft' }}
							</Button>

							<Button
								:disabled="isPendingCreate || !values.title"
								class="h-11 font-medium hover:bg-blue-400"
								type="submit">
								<Loader2 v-if="isPendingCreate" class="w-4 h-4 mr-2 animate-spin" />
								<BriefcaseBusiness v-else class="w-4 h-4 mr-2" />
								{{ isPendingCreate ? 'Creating...' : 'Create Job' }}
							</Button>
						</div>
						<div v-else class="flex flex-row justify-end mt-4 gap-x-3">
							<Button
								class="bg-accent-foreground/40 hover:bg-gray-300 rounded-2xl h-auto py-3.5 px-10 text-white"
								type="button"
								@click="cancel">
								Cancel
							</Button>

							<Button
								:disabled="isPendingUpdate || !values.title"
								class="h-11 font-medium hover:bg-blue-400"
								type="submit">
								<Loader2 v-if="isPendingUpdate" class="w-4 h-4 mr-2 animate-spin" />
								<BriefcaseBusiness v-else class="w-4 h-4 mr-2" />
								{{ isPendingUpdate ? 'Submitting...' : 'Submit' }}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	</ContentWrapper>
</template>

<style></style>
