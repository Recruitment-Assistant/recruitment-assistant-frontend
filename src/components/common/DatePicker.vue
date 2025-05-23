<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateValueToLocalDate } from '@/lib/utils';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { onBeforeMount, ref } from 'vue';
import CalendarCustom from '../custom/CalendarCustom.vue';
import IconFromSvg from './IconFromSvg.vue';
import { Calendar } from 'lucide-vue-next';

const value = ref<DateValue>();

onBeforeMount(() => {
	const dateValue = today(getLocalTimeZone());
	value.value = dateValue;
});
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				:class="
					cn(
						'w-[150px] justify-start text-left font-normal rounded-2xl gap-3',
						!value && 'text-muted-foreground',
					)
				"
				variant="outline">
				<IconFromSvg :icon="Calendar" />
				{{ value ? formatDateValueToLocalDate(value) : 'Pick a date' }}
			</Button>
		</PopoverTrigger>
		<PopoverContent align="end" class="w-auto p-0 rounded-2xl">
			<CalendarCustom v-model="value" initial-focus />
		</PopoverContent>
	</Popover>
</template>
