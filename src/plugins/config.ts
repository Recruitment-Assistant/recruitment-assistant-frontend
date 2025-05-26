import { AUTH_API } from '@/constants/api/auth.api';

export const Config = {
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
	path: {
		refreshToken: AUTH_API.REFRESH_TOKEN,
	},
	key: {
		accessToken: 'access_token',
		refreshToken: 'refresh_token',
		account: 'user',
		organizationId: 'organization_id',
	},
	retryStatusCodes: [401],
	oAuth: {
		clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
	},
};
