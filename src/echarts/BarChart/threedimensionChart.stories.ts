import type { Meta, StoryObj } from '@storybook/react';
import ThreedimensionChart from './threedimensionChart';
import { threeDimendData } from '../../data';

const meta = {
    title: 'Echarts/ThreedimensionChart',
    component: ThreedimensionChart,
    tags: ['autodocs'],
} satisfies Meta<typeof ThreedimensionChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        data:threeDimendData
    },
};
