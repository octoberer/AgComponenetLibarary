import type { Meta, StoryObj } from '@storybook/react';
import {  shareDataSetData } from '../../data';
import ShareDatasetChart from './ShareDataset';

const meta = {
    title: 'Echarts/ShareDatasetChart',
    component: ShareDatasetChart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ShareDatasetChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        DataSet:shareDataSetData
    },
};

