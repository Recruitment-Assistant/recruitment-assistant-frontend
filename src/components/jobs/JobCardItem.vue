<script lang="ts" setup>
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { defineProps } from 'vue';
import { Job } from '@/types';
import { useRouter } from 'vue-router';

interface Props {
	job: Job;
}

const props = defineProps<Props>();

const formatSalary = (salaryRange: any) => {
	if (!salaryRange.min && !salaryRange.max) return 'Not specified';
	const min = salaryRange.min.toLocaleString();
	const max = salaryRange.max.toLocaleString();
	return `${min} - ${max} ${salaryRange.currency} / ${salaryRange.interval}`;
};

const formatDate = (dateString: string) => {
	if (!dateString) return 'N/A';
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

const router = useRouter();

const viewDetail = () => {
	router.push({ name: 'job-detail', params: { id: props.job.id } });
};
</script>

<template>
	<Card
		class="w-full max-w-2xl mx-auto border border-gray-200 hover:shadow-lg transition-shadow duration-300">
		<CardHeader>
			<div class="flex justify-between items-start">
				<div>
					<CardTitle class="text-2xl font-bold text-gray-900">{{ job.title }}</CardTitle>
					<CardDescription class="text-gray-600 mt-1"
						>{{ job.location }} •
						{{ job.employment_type.replace('_', ' ').toLowerCase() }}
					</CardDescription>
				</div>
				<Badge
					:variant="job.status === 'DRAFT' ? 'secondary' : 'default'"
					class="capitalize">
					{{ job.status.toLowerCase() }}
				</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Description</h3>
					<p class="text-gray-600">{{ job.description || 'No description provided' }}</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Requirements</h3>
					<p class="text-gray-600">
						{{ job.requirements || 'No requirements specified' }}
					</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Salary Range</h3>
					<p class="text-gray-600">
						{{ formatSalary(job.salary_range) }}
						<span v-if="job.salary_range.bonus_eligible"> • Bonus Eligible</span>
						<span v-if="job.salary_range.equity_offered"> • Equity Offered</span>
					</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Tags</h3>
					<div class="flex flex-wrap gap-2">
						<Badge v-for="tag in job.tags" :key="tag" variant="outline">
							{{ tag }}
						</Badge>
					</div>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Details</h3>
					<ul class="text-gray-600 space-y-1">
						<li>Published: {{ formatDate(job.published_at) }}</li>
						<li v-if="job.closed_at">Closes: {{ formatDate(job.closed_at) }}</li>
						<li>Remote: {{ job.remote_eligible ? 'Yes' : 'No' }}</li>
						<li>Quantity: {{ job.quantity }}</li>
						<li>Job Code: {{ job.job_code }}</li>
					</ul>
				</div>
			</div>
		</CardContent>
		<CardFooter class="flex justify-end">
			<Button class="bg-blue-500 hover:bg-blue-600" @click="viewDetail">View details</Button>
		</CardFooter>
	</Card>
</template>
