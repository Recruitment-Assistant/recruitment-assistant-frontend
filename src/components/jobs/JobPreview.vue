<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface Props {
	formData: any;
}

const props = defineProps<Props>();

const getStatusVariant = (status: string) => {
	switch (status) {
		case 'PUBLISHED':
			return 'default';
		case 'DRAFT':
			return 'secondary';
		case 'CLOSED':
			return 'destructive';
		default:
			return 'outline';
	}
};

const formatStatus = (status: string) => {
	if (!status) return 'Status';
	return status.charAt(0) + status.slice(1).toLowerCase();
};

const formatEmploymentType = (type: string) => {
	if (!type) return 'Employment Type';
	return type
		.split('_')
		.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
		.join(' ');
};

const formatSalaryRange = () => {
	const { min, max, currency, interval } = props.formData.salary_range;

	if (!min && !max) return 'Salary Range';

	const formatNumber = (num: number | null) => {
		if (!num) return '';
		return new Intl.NumberFormat().format(num);
	};
};
</script>

<template>
	<div class="bg-white rounded-lg shadow-lg p-6 sticky top-6">
		<h2 class="text-xl font-semibold text-gray-800 mb-6">Live Preview</h2>

		<Card class="border-2 border-dashed border-gray-200">
			<CardHeader>
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<CardTitle class="text-2xl">
							{{ formData.title || 'Job Title' }}
						</CardTitle>
						<p class="text-gray-600 mt-1">
							{{ formData.location || 'Location' }}
						</p>
					</div>
					<Badge :variant="getStatusVariant(formData.status)">
						{{ formatStatus(formData.status) }}
					</Badge>
				</div>
			</CardHeader>

			<CardContent class="space-y-4">
				<!-- Employment Details -->
				<div class="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span class="font-medium text-gray-700">Type:</span>
						<p>{{ formatEmploymentType(formData.employment_type) }}</p>
					</div>
					<div>
						<span class="font-medium text-gray-700">Positions:</span>
						<p>{{ formData.quantity || 1 }}</p>
					</div>
				</div>

				<!-- Remote Work -->
				<div v-if="formData.remote_eligible" class="flex items-center space-x-2">
					<Badge variant="outline" class="text-green-600 border-green-600">
						Remote Work Available
					</Badge>
				</div>

				<!-- Salary Range -->
				<div
					v-if="formData.salary_range.min || formData.salary_range.max"
					class="space-y-2">
					<span class="font-medium text-gray-700">Salary Range:</span>
					<p class="text-lg font-semibold text-green-600">
						{{ formatSalaryRange() }}
					</p>
					<div class="flex space-x-2">
						<Badge v-if="formData.salary_range.bonus_eligible" variant="outline">
							Bonus Eligible
						</Badge>
						<Badge v-if="formData.salary_range.equity_offered" variant="outline">
							Equity Offered
						</Badge>
					</div>
				</div>

				<!-- Tags -->
				<div v-if="formData.tags.length > 0" class="space-y-2">
					<span class="font-medium text-gray-700">Tags:</span>
					<div class="flex flex-wrap gap-2">
						<Badge v-for="tag in formData.tags" :key="tag" variant="secondary">
							{{ tag }}
						</Badge>
					</div>
				</div>

				<!-- Description -->
				<div v-if="formData.description" class="space-y-2">
					<span class="font-medium text-gray-700">Description:</span>
					<p class="text-gray-600 whitespace-pre-wrap">{{ formData.description }}</p>
				</div>

				<!-- Requirements -->
				<div v-if="formData.requirements" class="space-y-2">
					<span class="font-medium text-gray-700">Requirements:</span>
					<p class="text-gray-600 whitespace-pre-wrap">{{ formData.requirements }}</p>
				</div>

				<!-- Dates -->
				<div class="grid grid-cols-1 gap-2 text-sm text-gray-500">
					<div v-if="formData.published_at">
						<span class="font-medium">Published:</span>
						{{ formatDateTime(formData.published_at) }}
					</div>
					<div v-if="formData.closed_at">
						<span class="font-medium">Closes:</span>
						{{ formatDateTime(formData.closed_at) }}
					</div>
				</div>

				<!-- Department -->
				<div v-if="formData.department_id" class="text-sm">
					<span class="font-medium text-gray-700">Department:</span>
					<span class="ml-2">{{ formData.department_id }}</span>
				</div>
			</CardContent>
		</Card>
	</div>
</template>
