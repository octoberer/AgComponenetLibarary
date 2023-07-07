import type { Meta, StoryObj } from '@storybook/react';
import { AntdFunnel } from './funnel';
const meta = {
    title: 'Antd/AntdFunnel',
    component: AntdFunnel,
    tags: ['autodocs'],
    argTypes: {
        labelType: {
            options: ['percent', 'content'],
            control: { type: 'radio' },
        },
        shape: {
            options: ['funnel', 'pyramid'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof AntdFunnel>;

type Story = StoryObj<typeof meta>;
export default meta;
const data = [
    {
        stage: '简历筛选',
        number: 253,
    },
    {
        stage: '初试人数',
        number: 151,
    },
    {
        stage: '复试人数',
        number: 113,
    },
    {
        stage: '录取人数',
        number: 87,
    },
    {
        stage: '入职人数',
        number: 59,
    },
];
export const Default: Story = {
    args: {
        data: data,
        xField: 'stage',
        yField: 'number',
        hasLegend: false,
        compareField: undefined,
        seriesField: undefined,
        conversionTag: true,
        labelType: 'percent',
        shape: 'funnel',
        dynamicHeight: false,
        isTransposed: false,
    },
};
const compareFielddata = [
    {
        stage: '简历筛选',
        number: 253,
        company: 'A公司',
    },
    {
        stage: '初试人数',
        number: 151,
        company: 'A公司',
    },
    {
        stage: '复试人数',
        number: 113,
        company: 'A公司',
    },
    {
        stage: '录取人数',
        number: 87,
        company: 'A公司',
    },
    {
        stage: '入职人数',
        number: 59,
        company: 'A公司',
    },
    {
        stage: '简历筛选',
        number: 303,
        company: 'B公司',
    },
    {
        stage: '初试人数',
        number: 251,
        company: 'B公司',
    },
    {
        stage: '复试人数',
        number: 153,
        company: 'B公司',
    },
    {
        stage: '录取人数',
        number: 117,
        company: 'B公司',
    },
    {
        stage: '入职人数',
        number: 79,
        company: 'B公司',
    },
];
export const compareField: Story = {
    args: {
        data: compareFielddata,
        xField: 'stage',
        yField: 'number',
        hasLegend: false,
        compareField: 'company',
        seriesField: undefined,
        conversionTag: true,
        labelType: 'percent',
        shape: 'funnel',
        dynamicHeight: false,
        isTransposed: false,
    },
};
export const seriesField: Story = {
    args: {
        data: compareFielddata,
        xField: 'stage',
        yField: 'number',
        hasLegend: false,
        seriesField: 'company',
        conversionTag: true,
        labelType: 'percent',
        shape: 'funnel',
        dynamicHeight: false,
        isTransposed: false,
    },
};
