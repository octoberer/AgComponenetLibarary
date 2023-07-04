import type { Meta, StoryObj } from '@storybook/react';
import {  treeMapData } from '../data';
import TreeMapChart from './treemap';

const meta = {
    title: 'Echarts/TreeMapChart',
    component: TreeMapChart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof TreeMapChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        data:treeMapData
    },
};