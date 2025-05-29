<script lang="ts" setup>
import {
	FormCheckbox,
	FormCombobox,
	FormInput,
	FormMarkdown,
	FormTagsInput,
} from '@/components/form';
import { useDepartment } from '@/composables/department';
import {
	JOB_STATUS,
	ListEmploymentType,
	ListSalaryCurrency,
	ListSalaryInterval,
} from '@/constants/job.constant';
import { type ComboboxType, type JobPayloadType, jobSchema } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import { BriefcaseBusiness, Building, Loader2, MapPin, User } from 'lucide-vue-next';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createJobApi } from '@/services/job.service.ts';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface Props {
	open: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: 'update:open', value: boolean): void;
}>();

const { data: departments } = useDepartment();

const isLoading = ref(false);

const listDepartment = computed<ComboboxType[]>(
	() =>
		departments.value?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [],
);

const isOpen = computed({
	get: () => props.open,
	set: (value) => emit('update:open', value),
});

const formSchema = toTypedSchema(jobSchema);

const { handleSubmit, values } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: JobPayloadType) => {
	values.status = JOB_STATUS.OPENING;
	const { status_code } = await createJobApi(values);
	if (status_code >= 400) {
		return;
	}

	isOpen.value = false;
});

const saveDraft = handleSubmit(async (values: JobPayloadType) => {
	const { status_code } = await createJobApi(values);
	if (status_code >= 400) {
		return;
	}

	isOpen.value = false;
});
</script>

<template>
	<ContentWrapper>
		<Dialog v-model:open="isOpen">
			<DialogContent class="sm:max-w-fit">
				<DialogHeader>
					<DialogTitle>Create Job</DialogTitle>
				</DialogHeader>

				<form @submit="onSubmit">
					<FormField v-slot="{ componentField }" :modelValue="values.title" name="title">
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
								:modelValue="values.location"
								:required="true"
								inputClass="w-full"
								label="Location"
								name="location"
								placeholder="Da Nang" />

							<FormInput
								:icon="User"
								:modelValue="values.quantity"
								:required="true"
								inputClass="w-full"
								label="Quantity"
								name="quantity"
								placeholder="Enter quantity"
								type="number" />

							<FormCombobox
								:icon="BriefcaseBusiness"
								:list="ListEmploymentType"
								:modelValue="values.employment_type"
								:required="true"
								label="Employment type"
								list-size="md"
								name="employment_type"
								placeholder="Select employment type" />

							<FormCombobox
								:icon="Building"
								:list="listDepartment"
								:modelValue="values.department_id"
								:required="true"
								label="Department"
								list-size="md"
								name="department_id"
								placeholder="Select department" />

							<div class="flex flex-col space-y-2">
								<FormTagsInput
									:modelValue="values.tags"
									:required="true"
									label="Tags"
									name="tags"
									placeholder="Tags" />

								<FormCheckbox
									:model-value="values.remote_eligible"
									label="Remote Work Eligible"
									name="remote_eligible" />
							</div>

							<!-- Salary Range -->
							<div class="space-y-4">
								<Label class="text-base font-medium">Salary Range</Label>

								<div class="grid grid-cols-2 gap-4">
									<FormInput
										:modelValue="values.salary_range?.min"
										:required="true"
										inputClass="w-full"
										label="Minimum"
										name="salary_range.min"
										placeholder="0"
										type="number" />
									<FormInput
										:modelValue="values.salary_range?.max"
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
										:modelValue="values.salary_range?.currency"
										:required="true"
										inputClass="w-full"
										label="Currency"
										list-size="md"
										name="salary_range.currency"
										placeholder="Select currency" />

									<FormCombobox
										:list="ListSalaryInterval"
										:modelValue="values.salary_range?.interval"
										:required="true"
										inputClass="w-full"
										label="Interval"
										list-size="md"
										name="salary_range.interval"
										placeholder="Select interval" />
								</div>

								<div class="grid grid-cols-2 gap-x-2 mt-2">
									<FormCheckbox
										:model-value="values.salary_range?.bonus_eligible"
										label="Bonus Eligible"
										name="bonus_eligible" />
									<FormCheckbox
										:model-value="values.salary_range?.equity_offered"
										label="Equity Offered"
										name="equity_offered" />
								</div>
							</div>
						</div>

						<div class="mt-6 grid gap-4">
							<FormMarkdown
								:model-value="values.description"
								inputClass="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-200 h-72"
								label="Job description"
								name="description"
								placeholder="A detailed job description" />

							<FormMarkdown
								:model-value="values.requirements"
								:required="true"
								label="Requirements"
								name="requirements"
								placeholder="Enter requirements" />
						</div>
					</ScrollArea>

					<DialogFooter>
						<div class="flex flex-row justify-end mt-4 gap-x-3">
							<Button
								:disabled="isLoading || !values.title"
								class="bg-accent-foreground/40 hover:bg-gray-300 rounded-2xl h-auto py-3.5 px-10 text-white"
								type="button"
								@click="saveDraft">
								<Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
								<BriefcaseBusiness v-else class="w-4 h-4 mr-2" />
								{{ isLoading ? 'Saving...' : 'Save as draft' }}
							</Button>

							<Button
								:disabled="isLoading || !values.title"
								class="h-11 font-medium hover:bg-blue-400"
								type="submit">
								<Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
								<BriefcaseBusiness v-else class="w-4 h-4 mr-2" />
								{{ isLoading ? 'Creating...' : 'Create Job' }}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	</ContentWrapper>
</template>

<style></style>
