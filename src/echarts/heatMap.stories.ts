import type { Meta, StoryObj } from '@storybook/react';
import { heatMapDataobj } from '../data';
import HeatMapChart from './heatMap';

const meta = {
    title: 'Echarts/HeatMapChart',
    component: HeatMapChart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof HeatMapChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        ...heatMapDataobj
    },
};