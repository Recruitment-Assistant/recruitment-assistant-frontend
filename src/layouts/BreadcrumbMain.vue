<script lang="ts" setup>
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
	<Breadcrumb class="hidden md:flex pb-1">
		<BreadcrumbList>
			<template v-for="(router, index) in route.matched" :key="index">
				<BreadcrumbItem v-if="router.name">
					<BreadcrumbLink
						v-if="route.fullPath !== router.path"
						as-child
						class="font-normal">
						<RouterLink :to="router.path">{{ router.name }}</RouterLink>
					</BreadcrumbLink>
					<BreadcrumbPage v-else class="text-blue-500 font-medium">
						{{ router.name }}
					</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator v-if="index + 1 < route.matched.length" />
			</template>
		</BreadcrumbList>
	</Breadcrumb>
</template>
