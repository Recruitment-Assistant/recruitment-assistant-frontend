<script lang="ts" setup>
interface Props {
	experience?: any[];
}

defineProps<Props>();
</script>

<template>
	<div class="space-y-6">
		<h3 class="text-lg font-semibold text-gray-900">Work Experience</h3>

		<div class="space-y-6">
			<div v-for="(exp, index) in experience" :key="exp.id" class="relative">
				<div
					v-if="index < experience.length - 1"
					class="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>

				<div class="flex gap-4">
					<div
						class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
						<Building2Icon class="w-6 h-6 text-blue-600" />
					</div>

					<div class="flex-1 pb-6">
						<div
							class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
							<h4 class="text-lg font-semibold text-gray-900">{{ exp.role }}</h4>
							<span class="text-sm text-gray-600 mt-1 sm:mt-0">{{
								exp.duration
							}}</span>
						</div>

						<div class="flex items-center gap-2 text-gray-600 mb-3">
							<span class="font-medium">{{ exp.company }}</span>
							<span>•</span>
							<span>{{ exp.location }}</span>
						</div>

						<p class="text-gray-700 leading-relaxed">{{ exp.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
