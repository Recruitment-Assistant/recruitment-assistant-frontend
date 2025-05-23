import { defineStore } from 'pinia';
import type { IJobFilter, JobState } from '@/types/jobs/job.ts';
import { ref } from 'vue';
import { getAllJobs, getJob } from '@/services/job.service.ts';

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

	/**
	 *  define action
	 */

	const fetchJobs = async (filter?: IJobFilter) => {
		state.value.loading = true;
		state.value.error = null;

		const response = await getAllJobs(filter);
		state.value.jobs = response.data;
		state.value.loading = false;
	};

	const getJobById = async (jobId: string) => {
		state.value.loading = true;

		const response = await getJob(jobId);
		state.value.currentJob = response.data;
		state.value.loading = false;
	};
	return {
		state,
		fetchJobs,
		getJobById,
	};
});
