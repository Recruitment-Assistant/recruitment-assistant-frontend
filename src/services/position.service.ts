import { POSITION_API } from '@/constants/api/position.api';
import axiosClient from '@/plugins';
import type { IApiResponseV1, IPositionFilter, Position } from '@/types';

export const getAllPosition = async (payload: IPositionFilter) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<Position[]>>(POSITION_API.BASE, {
		params: payload,
	});
	if (status >= 400) {
		throw new Error();
	}
	return data.data as Position[];
};
