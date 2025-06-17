import type { IBaseResponse, IFileResponse } from '@/types/index.ts';

export interface IBaseCandidate extends Partial<IBaseResponse> {
	full_name: string;
	email: string;
	phone_number?: string;
	applied_at: string;
	score_resume_match: number;
	application_id: string;
}

export interface IEducation {
	major: string;
	degree: string;
	school: string;
	start_date: string;
	end_date: string;
}

export interface ICandidate extends IBaseResponse {
	organization_id: string;
	created_by: string | null;
	full_name: string;
	email: string;
	phone_number: string;
	address: string;
	gender: string | null;
	date_of_birth: string | null;
	linkedin_profile: string;
	portfolio_url: string | null;
	education: IEducation[];
	work_experience: any[];
	skills: string[];
	languages: string[];
	certifications: any[];
	summary: string;
	resume: IFileResponse;
	source: string;
	notes: string | null;
}
