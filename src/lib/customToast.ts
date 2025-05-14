import { h, type Component } from 'vue';
import { toast, type Action } from 'vue-sonner';
import { CircleCheck, CircleX, TriangleAlert, Info } from 'lucide-vue-next';

export const useCustomToast = () => {
	const showToast = (
		options: {
			message: string;
			description?: string;
			type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'dismiss';
			icon?: any;
			action?: Action | Component;
		},
		loadingToast?: string | number,
	) => {
		const icons = {
			success: h(CircleCheck, { class: 'text-green-500' }),
			error: h(CircleX, { class: 'text-red-500' }),
			warning: h(TriangleAlert, { class: 'text-yellow-300' }),
			info: h(Info, { class: 'text-blue-500' }),
		};

		if (options.type === 'loading') {
			return toast.loading(options.message);
		}

		if (options.type === 'dismiss') {
			toast.dismiss(loadingToast);
			return;
		}

		toast(options.message, {
			description: options.description,
			icon: options.icon || icons[options?.type || 'info'],
			action: options.action,
		});
	};

	return { showToast };
};
