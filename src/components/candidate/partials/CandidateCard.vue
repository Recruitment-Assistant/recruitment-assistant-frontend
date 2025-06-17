<script lang="ts" setup>
import { Clock, Star } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import type { IBaseCandidate } from '@/types/candidate.ts';
import UserAvatar from '@/components/common/UserAvatar.vue';

interface Props {
	candidate: IBaseCandidate;
}

defineProps<Props>();

const emit = defineEmits<{
	onClick: [applicationId: string];
}>();

const handleClickItem = (applicationId: string) => {
	emit('onClick', applicationId);
};

const formatTime = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return 'Just now';
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
	if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
	});
};

const formatPhoneNumber = (phone: string) => {
	const cleaned = phone.replace(/\D/g, '');
	if (cleaned.length === 10) {
		return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
	}
	return phone;
};

const getAvatarUrl = (email: string) => {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`;
};

const getScoreBadgeVariant = (score: number) => {
	if (score >= 80) return 'default'; // Green/primary
	if (score >= 60) return 'secondary'; // Yellow/warning
	return 'destructive'; // Red/danger
};

const getScoreBarColor = (score: number) => {
	if (score >= 80) return 'bg-green-500';
	if (score >= 60) return 'bg-yellow-500';
	return 'bg-red-500';
};
</script>

<template>
	<div
		class="bg-background flex flex-col gap-3 rounded-2xl p-4 hover:cursor-pointer hover:bg-accent/50 transition-colors border border-border/50 hover:border-border"
		@click="handleClickItem(candidate.application_id)">
		<!-- Header with avatar and basic info -->
		<div class="flex items-start gap-3">
			<div class="relative">
				<UserAvatar
					:name="candidate.full_name"
					:src="getAvatarUrl(candidate.email)"
					class="w-10 h-10" />
				<Badge
					:variant="getScoreBadgeVariant(candidate.score_resume_match)"
					class="absolute -top-1 -right-1 text-xs px-1 py-0 h-5 min-w-5">
					{{ candidate.score_resume_match }}
				</Badge>
			</div>

			<div class="flex-1 min-w-0">
				<p class="font-medium text-foreground truncate">{{ candidate.full_name }}</p>
				<p class="text-sm text-muted-foreground truncate">{{ candidate.email }}</p>
				<p v-if="candidate.phone_number" class="text-xs text-muted-foreground truncate">
					{{ formatPhoneNumber(candidate.phone_number) }}
				</p>
			</div>
		</div>

		<!-- Application time and score details -->
		<div class="flex items-center justify-between text-sm">
			<div class="flex items-center gap-2 text-muted-foreground">
				<Clock class="w-4 h-4" />
				<span>{{ formatTime(candidate.applied_at) }}</span>
			</div>

			<div class="flex items-center gap-2">
				<div class="flex items-center gap-1">
					<Star class="w-4 h-4 text-yellow-500 fill-current" />
					<span class="text-sm font-medium"
						>{{ candidate.score_resume_match }}% match</span
					>
				</div>
			</div>
		</div>

		<!-- Optional: Resume match indicator bar -->
		<div class="w-full bg-secondary rounded-full h-1.5">
			<div
				:class="getScoreBarColor(candidate.score_resume_match)"
				:style="`width: ${candidate.score_resume_match}%`"
				class="h-1.5 rounded-full transition-all duration-300"></div>
		</div>
	</div>
</template>
