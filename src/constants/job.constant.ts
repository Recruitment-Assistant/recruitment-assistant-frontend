import { convertEnumToComboboxType } from '@/helpers';

export enum JOB_STATUS {
	DRAFT = 'DRAFT',
	PUBLISHED = 'PUBLISHED',
	CLOSED = 'CLOSED',
	FILLED = 'FILLED',
	CANCELLED = 'CANCELLED',
	ARCHIVED = 'ARCHIVED',
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
