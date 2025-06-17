import type { IBaseResponse, IFileResponse, IFilterRequest } from '@/types';
import { APPLICATION_STATUS, CANDIDATE_SOURCE } from '@/constants/candidate.constant.ts';
import { SALARY_CURRENCY, SALARY_INTERVAL } from '@/constants/job.constant.ts';
import type { ICandidate } from '@/types/candidate.ts';
import type { IJob } from '@/types/jobs';

// request
export interface IFilterApplication extends IFilterRequest {
	job_id?: string[];
	stage_id?: string[];
}

// response
export interface IAISummary {
	education: string;
	full_name: string;
	core_skills: string[];
	recent_company: string | null;
	notable_projects: string[];
	recent_job_title: string;
	total_experience_years: number;
}

export interface IResumeLog extends IBaseResponse {
	application_id: string;
	ai_summary: IAISummary;
	selected: boolean;
	score_resume_match: number;
	experience_level: string;
	feedback: string;
	matching_skills: string[];
	missing_skills: string[];
	learning_score: number | null;
	project_score: number | null;
	experience_score: number | null;
	skill_score: number | null;
	analyzed_at: string;
}

export interface IApplication extends IBaseResponse {
	organization_id: string;
	candidate_id: string;
	job_id: string;
	source: CANDIDATE_SOURCE;
	resume: IFileResponse;
	cover_letter: string;
	raw_resume_text: string;
	screening_score: number;
	screening_note: string;
	final_score: number;
	score_resume_match: number;
	current_stage_id: string;
	status: APPLICATION_STATUS;
	expected_salary?: {
		salary: number;
		currency: SALARY_CURRENCY;
		interval: SALARY_INTERVAL;
	};
	referred_by: string;
	applied_at: string;
	candidate: ICandidate;
	resume_log: IResumeLog;
	job: IJob;
}
