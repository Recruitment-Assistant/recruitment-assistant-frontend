import type { Updater } from '@tanstack/vue-table';
import type { Ref } from 'vue';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { DateValue } from 'reka-ui';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
	ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue;
}

export const formatCurrency = (amount: number) => {
	return `đ${amount.toLocaleString('vi-VN')}`;
};

export const formatDateValueToLocalDate = (value: DateValue) => {
	const day = String(value.day).padStart(2, '0');
	const month = String(value.month).padStart(2, '0');

	return `${day}/${month}/${value.year}`;
};

export const createApiEndpoint = (str: string, ...args: any[]): string => {
	let i = 0;
	return str.replace(/%[sdj%]/g, (match) => {
		if (match === '%%') {
			return '%';
		}
		const arg = args[i++];
		switch (match) {
			case '%s':
				return String(arg);
			case '%d':
				return Number(arg).toString();
			case '%j':
				try {
					return JSON.stringify(arg);
				} catch {
					return '[Circular]';
				}
			default:
				return '';
		}
	});
};

export const formatFileSize = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

	return `${size} ${sizes[i]}`;
};
