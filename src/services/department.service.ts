import axiosClient from '@/plugins';
import type { Department, IApiResponseV1, IDepartmentFilter } from '@/types';
import { DEPARTMENT_API } from '@/constants/api/department.api.ts';

export const getAllDepartment = async (payload: IDepartmentFilter) => {
	const { data, status } = await axiosClient.get<IApiResponseV1<Department[]>>(
		DEPARTMENT_API.BASE,
		{
			params: payload,
		},
	);
	if (status >= 400) {
		return;
	}
	return data.data as Department[];
};
