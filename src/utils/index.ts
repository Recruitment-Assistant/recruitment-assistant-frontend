export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(amount);
};

export const formatTime = (time: string | number | any): string => {
	const now = new Date().getTime();
	const diffTime = now - new Date(time).getTime();
	const seconds = diffTime / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	const months = days / 30;
	const years = months / 12;

	if (seconds < 60) {
		return `${Math.floor(seconds)} ${Math.floor(seconds) === 1 ? 'second' : 'seconds'}`;
	} else if (minutes < 60) {
		return `${Math.floor(minutes)} ${Math.floor(minutes) === 1 ? 'minute' : 'minutes'}`;
	} else if (hours < 24) {
		return `${Math.floor(hours)} ${Math.floor(hours) === 1 ? 'hour' : 'hours'}`;
	} else if (days < 30) {
		return `${Math.floor(days)}  ${Math.floor(days) === 1 ? 'day' : 'days'}`;
	} else if (months < 12) {
		return `${Math.floor(months)} ${Math.floor(months) === 1 ? 'month' : 'months'}`;
	}
	return `${Math.floor(years)} ${Math.floor(years) === 1 ? 'year' : 'years'}`;
};
