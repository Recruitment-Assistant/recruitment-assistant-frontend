import type { ActionGroupType, IJob } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/utils';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import { Pencil, Trash } from 'lucide-vue-next';
import JobStatusCelll from '@/components/jobs/partials/JobStatusCelll.vue';
import { ListJobStatus } from '@/constants/job.constant.ts';

export const jobColumn = (
	handleEdit: (payload: IJob) => void,
	handleUpdateStatus: (id: string, status: string) => void,
	handleDelete: (payload: IJob) => void,
): ColumnDef<IJob>[] => {
	return [
		{
			id: 'select',
			header: ({ table }) =>
				h(Checkbox, {
					checked:
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate'),
					'onUpdate:checked': (value: any) => table.toggleAllPageRowsSelected(!!value),
					ariaLabel: 'Select all',
					class: 'translate-y-0.5',
				}),
			cell: ({ row }) =>
				h(Checkbox, {
					checked: row.getIsSelected(),
					'onUpdate:checked': (value: any) => {
						return row.toggleSelected(!!value);
					},
					ariaLabel: 'Select row',
					class: 'translate-y-0.5',
				}),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'position',
			header: 'Position',
			cell: ({ row }) => row.original.title,
			enableHiding: false,
		},
		{
			accessorKey: 'department',
			header: 'Department',
			cell: ({ row }) => row.original.department?.name || 'UNKNOWN',
			enableHiding: false,
		},
		{
			accessorKey: 'location',
			header: 'Job Location',
			cell: ({ row }) => row.original.location || 'UNKNOWN',
			enableHiding: false,
		},
		{
			accessorKey: 'quantity',
			header: 'Quantity',
			cell: ({ row }) => `${row.original.applied_count}/${row.original.quantity}`,
		},
		{
			accessorKey: 'salary_min',
			header: 'Minimum Salary',
			cell: ({ row }) =>
				row.original.salary_range?.min
					? formatCurrency(
							row.original.salary_range?.min,
							row.original.salary_range?.currency,
						)
					: 'Negotiable',
		},
		{
			accessorKey: 'salary_max',
			header: 'Maximum Salary',
			cell: ({ row }) =>
				row.original.salary_range?.max
					? formatCurrency(
							row.original.salary_range?.max,
							row.original.salary_range?.currency,
						)
					: 'Negotiable',
		},
		{
			accessorKey: 'creator',
			header: 'Creator',
			cell: ({ row }) => row.original.creator?.name || 'UNKNOWN',
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const onUpdate = (status: string) => {
					handleUpdateStatus(row.original.id, status);
				};

				return h(JobStatusCelll, {
					list: ListJobStatus,
					modelValue: row.original.status,
					onUpdate,
				});
			},
		},
		{
			accessorKey: 'created_at',
			header: 'Created date',
			cell: ({ row }) =>
				new Intl.DateTimeFormat('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				}).format(new Date(row.original.created_at)),
		},
		{
			accessorKey: 'action',
			header: 'Action',
			cell: ({ row }) => {
				const actions: ActionGroupType[] = [
					{
						label: 'Edit',
						icon: Pencil,
					},
					{
						label: 'Delete',
						icon: Trash,
					},
				];

				const onEdit = () => handleEdit(row.original);
				const onDelete = () => handleDelete(row.original);

				return h(ActionGroupCommon, {
					actions,
					onEdit,
					onDelete,
				});
			},
		},
	];
};
