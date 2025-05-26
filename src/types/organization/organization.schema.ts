import { z } from 'zod';

export const organizationSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
	address: z.string().min(1, 'Address is required'),
	logo_url: z.string().optional(),
});

export type CreateOrganizationPayload = z.infer<typeof organizationSchema>;
