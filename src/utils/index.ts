export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount);
};
