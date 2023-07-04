import type { Meta, StoryObj } from '@storybook/react';
import TemperatureGaugechart from './TemperatureGaugechart';

const meta = {
    title: 'Echarts/TemperatureGaugechart',
    component: TemperatureGaugechart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof TemperatureGaugechart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        datavalue: 25,
    },
};