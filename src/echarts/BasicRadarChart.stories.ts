import type { Meta, StoryObj } from '@storybook/react';
import { radarChartData } from '../data';
import BasicRadarChart from './BasicRadarChart';

const meta = {
    title: 'Echarts/BasicRadarChart',
    component: BasicRadarChart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof BasicRadarChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        radar: radarChartData.radar,
        series: radarChartData.series,
    },
};
