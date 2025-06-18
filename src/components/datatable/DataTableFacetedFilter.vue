<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Check, CirclePlus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Column } from '@tanstack/vue-table';

interface DataTableFacetedFilter {
	column?: Column<any, any>;
	title: string;
	options: FacetedOption[];
	enableSelectExcept?: boolean;
	optionsAndCount?: Map<string, number>;
}

type FacetedOption = FacetedItem | FacetedGroup;

interface FacetedItem {
	label: string;
	value: string;
	icon?: object;
}

interface FacetedGroup {
	heading: string;
	options: FacetedItem[];
}

const props = defineProps<DataTableFacetedFilter>();
const facets = computed(() => {
	if (props.optionsAndCount) {
		return props.optionsAndCount;
	}
	return props.column?.getFacetedUniqueValues();
});

const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]));
const originalList = computed(() =>
	options.value.flatMap((item) => item.options).map((item) => item.value),
);
const valueExcept = ref<any>(new Set());

const options = computed(() => {
	const grouped = new Map();
	grouped.set('default', { heading: 'default', options: [] });
	for (const option of props.options) {
		if (!option.hasOwnProperty('options')) {
			grouped.get('default').options.push(option);
		} else {
			grouped.set(option?.heading, option);
		}
	}
	return Array.from(grouped.values());
});

const onSelect = (event: any, option: any) => {
	const isSelected = selectedValues.value.has(option.value);
	if (isSelected) {
		selectedValues.value.delete(option.value);
	} else {
		selectedValues.value.add(option.value);
	}
	const filterValues = Array.from(selectedValues.value);
	props?.column?.setFilterValue(filterValues?.length > 0 ? filterValues : undefined);
};

const handleSearch = (val: any, term: string) => {
	valueExcept.value = null;
	const dataFilter = val.filter((item: FacetedItem) =>
		item.label.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
	);
	valueExcept.value = new Set(dataFilter.map((item: any) => item.value));
	return dataFilter;
};

const handleSelectExcept = () => {
	const filterValues = originalList.value.filter((item) => !valueExcept.value.has(item));
	props.column?.setFilterValue(filterValues?.length > 0 ? filterValues : undefined);
};
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button class="bg-muted-foreground/2 !ml-0" size="sm" variant="outline">
				<CirclePlus class="mr-2 h-4 w-4" />
				{{ title }}
				<template v-if="selectedValues.size > 0">
					<Separator class="mx-2 h-4" orientation="vertical" />
					<Badge class="rounded-sm px-1 font-normal lg:hidden" variant="secondary">
						{{ selectedValues.size }}
					</Badge>
					<div class="hidden space-x-1 lg:flex">
						<template v-if="selectedValues.size > 2">
							<Badge class="rounded-sm px-1 font-normal" variant="secondary">
								{{ selectedValues.size }} selected
							</Badge>
						</template>
						<template v-else>
							<Badge
								v-for="option in options
									.flatMap((item) => item.options)
									.filter((option) => selectedValues.has(option.value))"
								:key="option.value"
								class="rounded-sm px-1 font-normal"
								variant="secondary">
								{{ option.label }}
							</Badge>
						</template>
					</div>
				</template>
			</Button>
		</PopoverTrigger>
		<PopoverContent align="start" class="m-w-max p-0">
			<Command :filter-function="(val: any, term: any) => handleSearch(val, term)">
				<CommandInput :placeholder="title" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<template v-for="(option, index) in options" :key="`item_${index}`">
						<CommandGroup
							:heading="option.heading != 'default' ? option.heading : null">
							<CommandItem
								v-for="item in option.options"
								:key="item.value"
								:value="item"
								class="text-xs sm:text-sm"
								@select="(event) => onSelect(event, item)">
								<div
									:class="
										cn(
											'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
											selectedValues.has(item.value)
												? 'bg-primary text-primary-foreground'
												: 'opacity-50 [&_svg]:invisible',
										)
									">
									<Check />
								</div>
								<component
									:is="item.icon"
									v-if="item.icon"
									class="mr-2 h-4 w-4 text-muted-foreground" />
								<span class="inline-block break-all">{{ item.label }}</span>
								<span
									v-if="facets?.get(item.value)"
									class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
									{{ facets.get(item.value) }}
								</span>
							</CommandItem>
						</CommandGroup>
					</template>
					<template v-if="selectedValues.size > 0">
						<CommandSeparator />
						<CommandGroup>
							<CommandItem
								:value="{ label: 'Clear filters' }"
								class="justify-center text-center"
								@select="column?.setFilterValue(undefined)">
								Clear filters
							</CommandItem>
						</CommandGroup>
					</template>
				</CommandList>
			</Command>
			<Button
				v-if="enableSelectExcept"
				class="justify-center text-sm !ml-0 w-full"
				@click="handleSelectExcept">
				Select all except
			</Button>
		</PopoverContent>
	</Popover>
</template>
