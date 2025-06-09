import { defineStore } from 'pinia';
import type { IJobFilter, JobState } from '@/types/jobs/job.ts';
import { ref } from 'vue';
import { getAllJobApi, getAllJobPublicApi, getJobApi } from '@/services/job.service.ts';

export const useJobStore = defineStore('job-store', () => {
	/**
	 *  define state
	 */

	const state = ref<JobState>({
		jobs: [],
		currentJob: null,
		loading: false,
		error: null,
		jobMeta: undefined,
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

		const response = await getAllJobApi(filter);
		state.value.jobs = response.data;
		state.value.jobMeta = response.meta;
		state.value.loading = false;
	};

	const fetchPublicJobs = async (filter?: IJobFilter) => {
		state.value.loading = true;
		state.value.error = null;

		const response = await getAllJobPublicApi(filter);
		state.value.jobs = response.data;
		state.value.jobMeta = response.meta;
		state.value.loading = false;
	};

	const getJobById = async (jobId: string) => {
		state.value.loading = true;

		const response = await getJobApi(jobId);
		state.value.currentJob = response.data;
		state.value.loading = false;
	};
	return {
		state,
		fetchJobs,
		fetchPublicJobs,
		getJobById,
	};
});
