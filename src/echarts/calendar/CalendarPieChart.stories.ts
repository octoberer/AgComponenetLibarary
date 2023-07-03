import type { Meta, StoryObj } from '@storybook/react';
import CalendarPieChart from './CalendarPieChart';
import { CalendarPieChartData } from '../../data';

const meta = {
    title: 'Echarts/CalendarPieChart',
    component: CalendarPieChart,
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof CalendarPieChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        Datedata:CalendarPieChartData
    },
};
