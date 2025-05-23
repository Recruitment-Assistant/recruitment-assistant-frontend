import type { AnalysisResult, IFileResponse, ResumeData } from '@/types';

export type ResumeAnalysisStage =
	| 'idle'
	| 'reading'
	| 'uploading'
	| 'extracting'
	| 'analyzing'
	| 'storing'
	| 'complete'
	| 'failed';

export interface SSEMessage {
	type: ResumeAnalysisStage;
	payload: any;
}

export interface FinalAnalysisResult {
	resumeText?: string;
	candidateId?: string;
	applicationId?: string;
	fileInfo?: IFileResponse;
	resumeData?: ResumeData;
	analysis?: AnalysisResult;
}
