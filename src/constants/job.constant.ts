import { convertEnumToComboboxType } from '@/helpers';

export enum JOB_STATUS {
	DRAFT = 'DRAFT',
	OPENING = 'OPENING',
	CLOSED = 'CLOSED',
	CANCELED = 'CANCELED',
}

export const ListJobStatus = convertEnumToComboboxType(JOB_STATUS);

export enum EMPLOYMENT_TYPE {
	FULL_TIME = 'FULL_TIME',
	PART_TIME = 'PART_TIME',
	CONTRACT = 'CONTRACT',
	TEMPORARY = 'TEMPORARY',
	INTERNSHIP = 'INTERNSHIP',
}

export const ListEmploymentType = convertEnumToComboboxType(EMPLOYMENT_TYPE);

export enum JOB_LEVEL {
	INTERN = 'INTERN',
	FRESHER = 'FRESHER',
	JUNIOR = 'JUNIOR',
	MIDDLE = 'MIDDLE',
	SENIOR = 'SENIOR',
	LEADER = 'LEADER',
	MANAGER = 'MANAGER',
	DIRECTOR = 'DIRECTOR',
}

export const ListJobLevel = convertEnumToComboboxType(JOB_LEVEL);

export enum SALARY_INTERVAL {
	Hourly = 'hourly',
	Daily = 'daily',
	Weekly = 'weekly',
	Monthly = 'monthly',
	Yearly = 'yearly',
}

export const ListSalaryInterval = convertEnumToComboboxType(SALARY_INTERVAL);

export enum SALARY_CURRENCY {
	VND = 'VND',
	USD = 'USD',
	EUR = 'EUR',
	GBP = 'GBP',
}

export const ListSalaryCurrency = convertEnumToComboboxType(SALARY_CURRENCY);
