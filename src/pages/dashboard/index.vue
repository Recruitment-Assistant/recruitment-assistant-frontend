<template>
	<div>
		<PageHeader
			description="Overview of your recruitment activities and metrics"
			title="Dashboard" />

		<!-- Stats Cards -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
			<StatusCard
				:icon="Briefcase"
				description="+2 since last month"
				title="Active Jobs"
				value="12" />
			<StatusCard
				:icon="UserPlus"
				description="+18% vs last month"
				title="Open Applications"
				value="124" />
			<StatusCard
				:icon="Calendar"
				description="Next: Today at 2:00 PM"
				title="Interviews Scheduled"
				value="28" />
			<StatusCard
				:icon="Clock"
				description="Avg. for last quarter"
				title="Time to Hire"
				value="24 days" />
		</div>

		<!-- Recent Activity -->
		<div class="space-y-6">
			<h2 class="text-xl font-semibold">Recent Activity</h2>
			<div class="bg-card rounded-lg border shadow-sm">
				<div class="p-4">
					<table class="w-full">
						<thead>
							<tr class="border-b">
								<th
									class="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
									Date
								</th>
								<th
									class="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
									Activity
								</th>
								<th
									class="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(activity, index) in recentActivities"
								:key="index"
								class="border-b last:border-0">
								<td class="py-3 px-4 text-sm">{{ activity.date }}</td>
								<td class="py-3 px-4 text-sm">{{ activity.description }}</td>
								<td class="py-3 px-4">
									<span
										:class="[
											'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
											activity.status === 'Completed'
												? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
												: activity.status === 'Scheduled'
													? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
													: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
										]">
										{{ activity.status }}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Briefcase, Calendar, Clock, UserPlus } from 'lucide-vue-next';
import PageHeader from '@/components/common/PageHeader.vue';
import StatusCard from '@/components/common/StatusCard.vue';

const recentActivities = [
	{
		date: 'May 13, 2025',
		description: 'Interview scheduled with John Doe for Senior Developer position',
		status: 'Scheduled',
	},
	{
		date: 'May 12, 2025',
		description: 'New application for Marketing Specialist from Jane Smith',
		status: 'New',
	},
	{
		date: 'May 12, 2025',
		description: 'Offer accepted by Michael Johnson for Product Manager role',
		status: 'Completed',
	},
	{
		date: 'May 11, 2025',
		description: 'First interviews with Sarah Williams for UX Designer position',
		status: 'Completed',
	},
	{
		date: 'May 10, 2025',
		description: 'Technical assessment sent to David Brown for Senior Frontend Developer',
		status: 'Pending',
	},
];
</script>
