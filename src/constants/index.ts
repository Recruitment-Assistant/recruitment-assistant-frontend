export const STATUS_STYLE: Record<string, string> = {
	'To-do': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	Rejected: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
	Approved: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	Canceled: 'bg-gray-50 text-slate-600 hover:bg-gray-50 hover:text-gray-500',
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const ROWS_PER_PAGE = [10, 20, 50, 70, 120, 190];

export const DATA_TIME = {
	TABLE: 60 * 1000,
	MORE_CHANGE: 60 * 1000,
	LESS_CHANGE: 24 * 60 * 60 * 1000,
	DELETE: 5 * 60 * 1000,
};

export enum ORDER {
	DESC = 'DESC',
	ASC = 'ASC',
}

export const JOB_STATUS_STYLE: Record<string, string> = {
	DRAFT: 'bg-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-600',
	PENDING: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-500',
	OPENING: 'bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500',
	CLOSED: 'bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500',
};
