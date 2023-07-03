import type { Meta, StoryObj } from '@storybook/react';
import { Calendardata, CalendargraphData } from '../../data';
import CalendarGraph from './CalendarGraph';

const meta = {
    title: 'Echarts/CalendarGraph',
    component: CalendarGraph,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof CalendarGraph>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        startDate: '2022-2-1',
        endDate: '2022-3-20',
        CalendarGraphdata: CalendargraphData,
        Calendardata: Calendardata,
    },
};
