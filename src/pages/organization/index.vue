<script lang="ts" setup>
import { ref } from 'vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Plus, UserPlus } from 'lucide-vue-next';
import CreateOrganizationForm from '@/components/organization/CreateOrganizationForm.vue';
import JoinOrganizationForm from '@/components/organization/JoinOrganizationForm.vue';

// State management
const selectedAction = ref('');
const isLoading = ref(false);

// Methods
const selectAction = (action: any) => {
	selectedAction.value = action;
};
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
		<Card class="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
			<CardHeader class="text-center space-y-2 pb-6">
				<div
					class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
					<Building2 class="w-8 h-8 text-white" />
				</div>
				<CardTitle class="text-2xl font-bold text-slate-800">Welcome!</CardTitle>
				<CardDescription class="text-slate-600 leading-relaxed">
					You don't have an organization yet. Please create a new one or join an existing
					organization to continue.
				</CardDescription>
			</CardHeader>

			<CardContent class="space-y-6">
				<!-- Action Selection Buttons -->
				<div class="grid grid-cols-2 gap-3">
					<Button
						:variant="selectedAction === 'create' ? 'default' : 'outline'"
						class="h-12 text-sm font-medium transition-all duration-200 hover:bg-blue-600"
						@click="selectAction('create')">
						<Plus class="w-4 h-4 mr-2" />
						Create New
					</Button>
					<Button
						:variant="selectedAction === 'join' ? 'default' : 'outline'"
						class="h-12 text-sm font-medium transition-all duration-200"
						@click="selectAction('join')">
						<UserPlus class="w-4 h-4 mr-2" />
						Join Existing
					</Button>
				</div>

				<!-- Create Organization Form -->
				<div
					v-if="selectedAction === 'create'"
					class="space-y-4 animate-in slide-in-from-top-2 duration-300">
					<CreateOrganizationForm />
				</div>

				<!-- Join Organization Form -->
				<div
					v-if="selectedAction === 'join'"
					class="space-y-4 animate-in slide-in-from-top-2 duration-300">
					<JoinOrganizationForm />
				</div>
			</CardContent>

			<CardFooter class="text-center pt-6">
				<p class="text-xs text-slate-500 mx-auto">
					Need help? Contact your administrator or check our support documentation.
				</p>
			</CardFooter>
		</Card>
	</div>
</template>
