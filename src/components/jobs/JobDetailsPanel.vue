<script lang="ts" setup>
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BriefcaseBusiness, Calendar, MapPin, NotebookPen, Tag } from 'lucide-vue-next';
import { Separator } from '@/components/ui/separator';
import type { IJob } from '@/types';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

interface Props {
	job?: IJob;
}

const props = defineProps<Props>();
const jobDescriptionHtml = computed(() => {
	const delta = JSON.parse((props.job?.description as string) || '{}');
	const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
	return converter.convert();
});

const jobRequirementHtml = computed(() => {
	const delta = JSON.parse((props.job?.requirements as string) || '{}');
	const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
	return converter.convert();
});

const formatSalary = (min: number, max: number, currency: string) => {
	return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
};

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

const getStatusVariant = (status: string) => {
	switch (status?.toLowerCase()) {
		case 'open':
			return 'success';
		case 'closed':
			return 'destructive';
		case 'draft':
			return 'secondary';
		default:
			return 'default';
	}
};
</script>

<template>
	<Card class="h-full overflow-auto border-r rounded-r-none shadow-none">
		<CardHeader class="pb-2 space-y-2">
			<div class="flex justify-between items-start">
				<div>
					<CardTitle class="text-2xl font-bold">{{ job?.title }}</CardTitle>
				</div>
				<Badge
					:variant="getStatusVariant(job?.status as string) as any"
					class="hover:bg-blue-400">
					{{ job?.status?.toLowerCase() }}
				</Badge>
			</div>
		</CardHeader>

		<CardContent class="space-y-6">
			<!-- Key Details Section -->
			<div class="grid grid-cols-2 gap-4">
				<div class="flex items-center gap-2">
					<BriefcaseBusiness class="h-5 w-5 text-muted-foreground" />
					<div class="space-y-1">
						<p class="text-xs text-muted-foreground font-medium">Department</p>
						<p class="text-sm font-medium">{{ job?.department?.name }}</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<MapPin class="h-5 w-5 text-muted-foreground" />
					<div class="space-y-1">
						<p class="text-xs text-muted-foreground font-medium">Location</p>
						<p class="text-sm font-medium">
							{{ job?.location }}
							<Badge
								v-if="job?.remote_eligible"
								class="ml-1 text-xs"
								variant="outline">
								Remote
							</Badge>
						</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<NotebookPen class="h-5 w-5 text-muted-foreground" />
					<div class="space-y-1">
						<p class="text-xs text-muted-foreground font-medium">Salary</p>
						<p v-if="job?.salary_range" class="text-sm font-medium">
							{{
								formatSalary(
									job.salary_range.min,
									job.salary_range.max,
									job.salary_range.currency,
								)
							}}
							/
							{{ job.salary_range.interval }}
						</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<Calendar class="h-5 w-5 text-muted-foreground" />
					<div class="space-y-1">
						<p class="text-xs text-muted-foreground font-medium">Published</p>
						<p class="text-sm font-medium">
							{{ job?.published_at ? formatDate(job.published_at) : 'Not published' }}
						</p>
					</div>
				</div>
			</div>
			<router-link
				:to="`/job/${job?.id}/apply`"
				class="inline-flex items-center justify-center text-white w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors">
				Apply now
			</router-link>

			<Separator />

			<!-- Benefits -->
			<div
				v-if="
					job?.salary_range &&
					(job.salary_range.bonus_eligible || job.salary_range.equity_offered)
				"
				class="flex gap-2">
				<Badge v-if="job.salary_range.bonus_eligible" class="bg-muted/50" variant="outline">
					Bonus Eligible
				</Badge>
				<Badge v-if="job.salary_range.equity_offered" class="bg-muted/50" variant="outline">
					Equity Offered
				</Badge>
			</div>

			<!-- Employment Type -->
			<div>
				<h3 class="text-sm font-semibold mb-2">Employment Type</h3>
				<p class="text-sm">
					{{
						job?.employment_type
							? job.employment_type.replace('_', ' ').toLowerCase()
							: ''
					}}
				</p>
			</div>

			<!-- Description -->
			<div>
				<h3 class="text-sm font-semibold mb-2">Description</h3>
				<div
					class="prose prose-sm max-w-none text-gray-800 dark:text-gray-100"
					v-html="jobDescriptionHtml" />
			</div>

			<!-- Requirements -->
			<div>
				<h3 class="text-sm font-semibold mb-2">Requirements</h3>
				<div
					class="prose prose-sm max-w-none text-gray-800 dark:text-gray-100"
					v-html="jobRequirementHtml" />
			</div>

			<!-- Tags -->
			<div v-if="job?.tags && job.tags.length > 0">
				<div class="flex items-center gap-2 mb-2">
					<Tag class="h-4 w-4 text-muted-foreground" />
					<h3 class="text-sm font-semibold">Tags</h3>
				</div>
				<div class="flex flex-wrap gap-2">
					<Badge v-for="tag in job?.tags" :key="tag" class="text-xs" variant="secondary">
						{{ tag }}
					</Badge>
				</div>
			</div>

			<Separator />

			<!-- Created By -->
			<div>
				<h3 class="text-sm font-semibold mb-3">Job Contact</h3>
				<div class="flex items-center space-x-3">
					<Avatar class="h-9 w-9">
						<AvatarImage
							:src="job?.creator?.avatar || 'https://github.com/unovue.png'" />
						<AvatarFallback>{{ job?.creator?.name?.charAt(0) }}</AvatarFallback>
					</Avatar>
					<div>
						<p class="text-sm font-medium">{{ job?.creator?.name }}</p>
						<p class="text-xs text-muted-foreground">{{ job?.creator?.email }}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
