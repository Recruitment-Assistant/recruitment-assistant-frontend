<template>
	<div class="container mx-auto px-4 py-12 md:py-24">
		<div class="flex flex-col gap-8 max-w-5xl mx-auto">
			<!-- Hero Section -->
			<div class="space-y-4 text-center">
				<h1 class="text-4xl md:text-6xl font-bold tracking-tighter">
					Streamline Your Recruitment Process
				</h1>
				<p class="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
					Modern recruitment assistant that helps teams hire better candidates, faster.
				</p>
				<div class="pt-4 flex gap-4 justify-center">
					<Button size="lg" as-child>
						<router-link to="/dashboard">Get Started</router-link>
					</Button>
					<Button size="lg" variant="outline">Learn More</Button>
				</div>
			</div>

			<!-- Features Section -->
			<div class="py-12">
				<h2 class="text-3xl font-bold text-center mb-8">Key Features</h2>
				<div class="grid md:grid-cols-3 gap-8">
					<div
						v-for="(feature, index) in features"
						:key="index"
						class="p-6 border rounded-lg bg-card">
						<div
							class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
							<component :is="feature.icon" class="h-6 w-6 text-primary" />
						</div>
						<h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
						<p class="text-muted-foreground">{{ feature.description }}</p>
					</div>
				</div>
			</div>

			<!-- CTA Section -->
			<div class="py-12 text-center">
				<div class="bg-accent rounded-lg p-8 md:p-12">
					<h2 class="text-2xl md:text-3xl font-bold mb-4">
						Ready to transform your hiring process?
					</h2>
					<p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
						Join thousands of companies that use our platform to streamline their
						recruitment.
					</p>
					<Button size="lg" as-child>
						<router-link to="/dashboard">Try for Free</router-link>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button.vue';
import { BarChart3, Clock, Users } from 'lucide-vue-next';

const features = [
	{
		title: 'Candidate Management',
		description: 'Easily organize and track candidates throughout your hiring pipeline.',
		icon: Users,
	},
	{
		title: 'Streamlined Process',
		description: 'Reduce time-to-hire with automated workflows and scheduling tools.',
		icon: Clock,
	},
	{
		title: 'Data-Driven Hiring',
		description: 'Make better decisions with powerful analytics and reporting.',
		icon: BarChart3,
	},
];
</script>
