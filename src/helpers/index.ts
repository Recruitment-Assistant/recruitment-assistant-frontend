export const convertEnumToComboboxType = (payload: object) => {
	return Object.values(payload).map((value) => ({
		label: value.replace(/_/g, ' '),
		value,
	}));
};
