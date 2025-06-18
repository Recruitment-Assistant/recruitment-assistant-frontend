<script lang="ts" setup>
import { Calendar, Download, Edit3, Mail, MapPin, Phone } from 'lucide-vue-next';
import type { ICandidate } from '@/types/candidate.ts';

interface Props {
	candidate: ICandidate;
}

defineProps<Props>();

const getStatusColor = (status: string) => {
	if (status === 'Rejected') return 'bg-red-100 text-red-800 border-red-200';
	return 'bg-gray-100 text-gray-800 border-gray-200';
};
</script>

<template>
	<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
		<div class="flex flex-col md:flex-row gap-6">
			<!-- Avatar and Basic Info -->
			<div class="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
				<div class="relative">
					<img
						:alt="candidate?.full_name"
						:src="candidate?.portfolio_url as string"
						class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg" />
					<div
						class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
				</div>

				<div class="flex-1 min-w-0">
					<h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
						{{ candidate?.full_name }}
					</h2>
					<p class="text-lg text-gray-600 mb-3">{{ candidate?.notes }}</p>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
						<div class="flex items-center gap-2 text-gray-600">
							<Mail class="w-4 h-4" />
							<span class="truncate">{{ candidate?.email }}</span>
						</div>
						<div class="flex items-center gap-2 text-gray-600">
							<Phone class="w-4 h-4" />
							<span>{{ candidate?.phone_number }}</span>
						</div>
						<div class="flex items-center gap-2 text-gray-600">
							<MapPin class="w-4 h-4" />
							<span>{{ candidate?.address }}</span>
						</div>
						<div class="flex items-center gap-2 text-gray-600">
							<Calendar class="w-4 h-4" />
							<span>Applied {{ candidate?.date_of_birth }}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Status and Actions -->
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap gap-2">
					<span
						:class="getStatusColor('')"
						class="px-3 py-1 rounded-full text-sm font-medium border">
						{{ candidate?.source }}
					</span>
					<span
						class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
						ID: {{ candidate?.id }}
					</span>
				</div>

				<div class="flex flex-wrap gap-2">
					<button
						class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						<Edit3 class="w-4 h-4" />
						<span class="hidden sm:inline">Edit</span>
					</button>
					<button
						class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
						<Download class="w-4 h-4" />
						<span class="hidden sm:inline">Download</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
