import type {
	BaseUser,
	Department,
	IBaseResponse,
	IFilterRequest,
	IPaging,
	Organization,
	Pipeline,
} from '@/types';
import { EMPLOYMENT_TYPE, type JOB_STATUS } from '@/constants/job.constant.ts';

export * from './job.schema.ts';

// request
export interface IJobFilter extends IFilterRequest {
	status?: JOB_STATUS[];
}

// response

export interface IJob extends IBaseResponse {
	title: string;
	pipeline_id: string;
	description: string;
	requirements: string;
	tags: string[];
	location: string;
	published_at: string;
	closed_at: string;
	status: JOB_STATUS;
	quantity: number;
	applied_count: number;
	remote_eligible: boolean;
	employment_type: EMPLOYMENT_TYPE;
	salary_range?: {
		min: number;
		max: number;
		currency: string;
		interval: string;
		bonus_eligible: boolean;
		equity_offered: boolean;
	};
	department_id?: string;
	organization_id: string;
	created_by: string;
	department?: Department;
	creator?: BaseUser;
	pipeline?: Pipeline;
	organization?: Organization;
}

export interface JobSummary {
	id?: string;
	active_candidates?: number;
	dropped_candidates?: number;
	total_candidates?: number;
	candidate_score?: number;
}

export interface JobState {
	jobs: IJob[];
	currentJob: IJob | null;
	loading: boolean;
	error: string | null;
	jobMeta?: IPaging;
}

export interface Education {
	school: string;
	degree: string;
	major: string;
	start_date: string;
	end_date: string;
}

export interface WorkExperience {
	company: string;
	position: string;
	start_date: string;
	end_date: string;
	description: string;
}

export interface ResumeData {
	full_name: string;
	email: string;
	phone: string;
	address: string;
	linkedin: string;
	skills: string[];
	education: Education[];
	work_experience: WorkExperience[];
	certifications: string[];
	languages: string[];
	summary: string;
}

export interface AISummary {
	full_name: string;
	total_experience_years: number;
	education: string;
	recent_job_title: string;
	recent_company: string;
	notable_projects: string[];
	core_skills: string[];
}

export interface AnalysisResult {
	selected: boolean;
	score_resume_match: number;
	feedback: string;
	matching_skills: string[];
	missing_skills: string[];
	experience_level: 'junior' | 'mid' | 'senior' | string;
	ai_summary: AISummary;
}
