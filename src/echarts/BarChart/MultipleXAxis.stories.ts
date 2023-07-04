import type { Meta, StoryObj } from '@storybook/react';
import MultipleXAxis from './multipleXAxis';
import { MultipleXAxisData } from '../../data';

const meta = {
    title: 'Echarts/MultipleXAxis',
    component: MultipleXAxis,
    tags: ['autodocs'],
} satisfies Meta<typeof MultipleXAxis>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        sourceData: MultipleXAxisData,
        stack:true
    },
};
