import type { IBaseResponse, IFilterRequest, IPaging } from '@/types';
import { EMPLOYMENT_TYPE, type JOB_STATUS } from '@/constants/job.constant.ts';

export interface IJobFilter extends IFilterRequest {}

export interface Job extends IBaseResponse {
	job_code: string;
	title: string;
	description: string;
	requirements: string;
	tags: string[];
	location: string;
	published_at: string;
	closed_at: string;
	status: JOB_STATUS;
	quantity: number;
	remote_eligible: boolean;
	employment_type: EMPLOYMENT_TYPE;
	salary_range: {
		min: number;
		max: number;
		currency: string;
		interval: string;
		bonus_eligible: boolean;
		equity_offered: boolean;
	};
	department_id: string;
	position_id: string;
	organization_id: string;
	created_by: string;
}

export interface JobState {
	jobs: Job[];
	currentJob: Job | null;
	loading: boolean;
	error: string | null;
	jobMeta: IPaging | null;
}
