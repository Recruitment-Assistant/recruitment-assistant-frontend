import { z } from 'zod';

export const jobSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	requirements: z.string().min(1, 'Requirements are required'),
	tags: z.array(z.string()).optional(),
	location: z.string().min(1, 'Location is required'),
	published_at: z.string().optional(),
	closed_at: z.string().optional(),
	status: z.enum(['DRAFT', 'OPENING', 'CLOSED', 'CANCELED']).default('DRAFT'),
	quantity: z.number().min(1, 'Quantity must be at least 1'),
	remote_eligible: z.boolean().default(false),
	employment_type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERNSHIP']),
	salary_range: z.object({
		min: z.number().min(0, 'Minimum salary must be positive'),
		max: z.number().min(0, 'Maximum salary must be positive'),
		currency: z.enum(['VND', 'USD', 'EUR', 'GBP']).default('VND'),
		interval: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly']).default('monthly'),
		bonus_eligible: z.boolean().default(false),
		equity_offered: z.boolean().default(false),
	}),
	department_id: z.string().optional(),
	pipeline_id: z.string(),
});

export type JobPayloadType = z.infer<typeof jobSchema>;

export const applyJobSchema = z.object({
	full_name: z.string().min(1, 'Title is required'),
	email: z.string().email(),
	phone_number: z.string().min(1, 'Phone number is required'),
	expected_salary: z.object({
		salary: z.number().min(0, 'Minimum salary must be positive').default(500),
		currency: z.enum(['VND', 'USD', 'EUR', 'GBP']).default('USD'),
		interval: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly']).default('monthly'),
	}),
	cover_letter: z.string().max(500).optional(),
});

export type ApplyJobPayloadType = z.infer<typeof applyJobSchema>;
