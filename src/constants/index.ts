export const STATUS_STYLE: Record<string, string> = {
	'To-do': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	Rejected: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	Approved: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	Canceled: 'bg-gray-50 text-slate-600 hover:bg-gray-50 hover:text-gray-500',
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const ROWS_PER_PAGE = [10, 20, 50, 70, 120, 190];

export enum ORDER {
	DESC = 'DESC',
	ASC = 'ASC',
}

export const ATTENDANCE_STYLE: Record<string, string> = {
	'Late Arrival': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	'Early Leave': 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
};

export const JOB_STATUS_STYLE: Record<string, string> = {
	DRAFT: 'bg-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-600',
	PENDING: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	OPENING: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	CLOSED: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
};

export const APPLICANT_STAGE_STYLE: Record<string, string> = {
	Applied: 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-500',
	Screening: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500',
	Interview: 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-500',
	Hired: 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500',
	Rejected: 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500',
};
