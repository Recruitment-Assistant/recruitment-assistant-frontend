import type { ActionGroupType, Job } from '@/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/utils';
import { JOB_STATUS_STYLE } from '@/constants';
import StatusTag from '@/components/common/StatusTag.vue';
import ActionGroupCommon from '@/components/common/ActionGroupCommon.vue';
import { Pencil, Trash } from 'lucide-vue-next';

export const jobColumn: ColumnDef<Job>[] = [
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
		cell: ({ row }) => row.original.quantity,
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
		header: 'Job Status',
		cell: ({ row }) =>
			h(StatusTag, {
				class: [JOB_STATUS_STYLE[row.original.status]],
				status: row.original.status,
			}),
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

			const onEdit = () => {
				console.log('edit', row.original.id);
			};

			const onDelete = () => {
				console.log('edit', row.original.id);
			};

			return h(ActionGroupCommon, {
				actions,
				onEdit,
				onDelete,
			});
		},
	},
];
