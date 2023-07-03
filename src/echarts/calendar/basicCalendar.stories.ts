import type { Meta, StoryObj } from '@storybook/react';
import { Calendardata, threeDimendData } from '../../data';
import BasicCalendar from './basicCalendar';

const meta = {
    title: 'Echarts/BasicCalendar',
    component: BasicCalendar,
    tags: ['autodocs'],
    argTypes: {
        coordinateType: {
            options: ['heatmap', 'scatter'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof BasicCalendar>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        Calendardata, endDate:'2022-11-5', startDate:'2022-2-1', coordinateType:'heatmap'
    },
};
