<script lang="ts" setup>
import ThemeToggle from '@/components/ThemeToggle.vue';
import { Button } from '@/components/ui/button';
</script>
<template>
	<header
		class="bg-background h-20 shadow-sm sticky top-0 flex gap-4 items-center justify-between px-8 z-50">
		<nav class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div class="container mx-auto px-4">
				<div class="flex h-16 items-center justify-between">
					<!-- Logo -->
					<router-link class="flex items-center space-x-4 pr-4" to="/">
						<div class="flex items-center space-x-2">
							<div
								class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
								<span class="text-primary-foreground font-bold text-sm">JH</span>
							</div>
							<span class="font-semibold text-lg">JobHub</span>
						</div>
					</router-link>

					<!-- Navigation Items -->
					<div class="hidden md:flex items-center space-x-6">
						<router-link
							class="text-sm font-medium hover:text-primary transition-colors"
							to="/">
							Home
						</router-link>
						<router-link
							class="text-sm font-medium hover:text-primary transition-colors"
							to="/">
							Jobs
						</router-link>
						<router-link
							class="text-sm font-medium hover:text-primary transition-colors"
							to="/">
							Companies
						</router-link>
						<router-link
							class="text-sm font-medium hover:text-primary transition-colors"
							to="/">
							About
						</router-link>
					</div>
				</div>
			</div>
		</nav>

		<div class="flex gap-4 items-center">
			<Button class="bg-blue-500 hover:bg-blue-400 rounded-2xl h-auto text-white">
				<router-link to="/auth/login">For Recruiter</router-link>
			</Button>
			<ThemeToggle />
		</div>
	</header>
</template>
