import { defineStore } from 'pinia';
import type { IJobFilter, JobState } from '@/types/jobs/job.ts';
import { ref } from 'vue';
import { getAllJobs } from '@/services/job.service.ts';

export const useJobStore = defineStore('job-store', () => {
	/**
	 *  define state
	 */

	const state = ref<JobState>({
		jobs: [],
		currentJob: null,
		loading: false,
		error: null,
		jobMeta: null,
	});

	/**
	 *  define getter
	 */

	const fetchJobs = async (filter?: IJobFilter) => {
		state.value.loading = true;
		state.value.error = null;

		const response = await getAllJobs(filter);
		state.value.jobs = response.data;
		state.value.loading = false;
	};

	/**
	 *  define action
	 */
	return {
		state,
		fetchJobs,
	};
});
