<script lang="ts" setup>
import {
	BarChart3,
	Building2,
	Edit,
	Globe,
	Settings,
	Star,
	TrendingUp,
	User,
	Users,
	UserX,
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Index, JobSummary } from '@/types';
import { JOB_STATUS } from '@/constants/job.constant.ts';

interface Props {
	job: Index;
	jobSummary: JobSummary;
}

defineProps<Props>();

const getJobStatusVariant = (status: string) => {
	const variants: Record<string, string> = {
		[JOB_STATUS.DRAFT]: 'secondary',
		[JOB_STATUS.OPENING]: 'default',
		[JOB_STATUS.CLOSED]: 'outline',
		[JOB_STATUS.CANCELED]: 'destructive',
	};

	return variants[status] || 'secondary';
};
</script>

<template>
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<h1 class="text-3xl font-bold mb-2">{{ job?.title }}</h1>
			<div class="flex items-center gap-4 text-sm mb-4">
				<div class="flex items-center gap-2">
					<Building2 class="w-4 h-4" />
					<span>{{ job?.organization?.name }}</span>
				</div>
				<div class="flex items-center gap-2">
					<User class="w-4 h-4" />
					<span>Owner: {{ job?.creator?.name }}</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<Badge :variant="getJobStatusVariant(job?.status) as any" class="text-sm hover:"
					>{{ job?.status }}
				</Badge>
				<div class="flex items-center gap-2">
					<Globe class="w-4 h-4 text-gray-500" />
					<span class="text-sm text-gray-600">
						{{ job?.published_at ? 'Published on Career Page' : 'Not Published' }}
					</span>
					<div
						:class="job?.published_at ? 'bg-green-500' : 'bg-gray-400'"
						class="w-2 h-2 rounded-full"></div>
				</div>
			</div>
		</div>
		<div class="flex flex-col space-y-2 items-end">
			<div class="flex gap-2">
				<Button size="sm" variant="outline">
					<Settings class="w-4 h-4 mr-2" />
					Settings
				</Button>
				<Button class="bg-blue-500 hover:bg-blue-400" size="sm">
					<Edit class="w-4 h-4 mr-2" />
					Edit Job
				</Button>
			</div>

			<!-- Statistics Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
				<Card>
					<CardContent class="p-1">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Active</p>
								<p class="text-2xl font-bold text-green-600">
									{{ jobSummary?.active_candidates }}
								</p>
							</div>
							<div
								class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
								<Users class="w-6 h-6 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Dropped</p>
								<p class="text-2xl font-bold text-red-600">
									{{ jobSummary?.dropped_candidates }}
								</p>
							</div>
							<div
								class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
								<UserX class="w-6 h-6 text-red-600" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">Total</p>
								<p class="text-2xl font-bold text-blue-600">
									{{ jobSummary?.total_candidates }}
								</p>
							</div>
							<div
								class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
								<BarChart3 class="w-6 h-6 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent class="p-6">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm font-medium text-gray-600">
									Avg. Candidate Score
								</p>
								<div class="flex items-center gap-2">
									<p class="text-2xl font-bold text-purple-600">
										{{ jobSummary?.candidate_score }}
									</p>
									<div class="flex">
										<Star
											v-for="star in 5"
											:key="star"
											:class="
												star <= Math.floor(jobSummary?.candidate_score / 20)
													? 'text-yellow-400'
													: 'text-gray-300'
											"
											class="w-4 h-4 fill-current" />
									</div>
								</div>
							</div>
							<div
								class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
								<TrendingUp class="w-6 h-6 text-purple-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</template>
