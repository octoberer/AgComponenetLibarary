import type { Meta, StoryObj } from '@storybook/react';
import { DemoArea } from './Demo';
import { StackAreaData, areaData, percentStackAreaData } from '../../data';
const meta = {
    title: 'Antd/Demoarea',
    component: DemoArea,
    tags: ['autodocs'],
} satisfies Meta<typeof DemoArea>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        data: areaData,
        xField: 'timePeriod',
        yField: 'value',
    },
};
export const Stack: Story = {
    args: {
        data: StackAreaData,
        xField: 'date',
        yField: 'value',
        seriesField: 'country',
    },
};
export const MedianAnnotations: Story = {
    args: {
        data: areaData,
        xField: 'timePeriod',
        yField: 'value',
        annotations: [
            {
                type: 'text',
                position: ['min', 'median'],
                content: '中位数',
                offsetY: -4,
                style: {
                    textBaseline: 'bottom',
                },
            },
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: 'red',
                    lineDash: [2, 2],
                },
            },
        ],
    },
};
export const percentStackArea: Story = {
    args: {
        data: percentStackAreaData,
        xField: 'year',
        yField: 'value',
        seriesField: 'country',
        isPercent: true,
        yAxis: {
            label: {
                formatter: (value) => {
                    return value * 100;
                },
            },
            max: 1,
        },
    },
};
export const patternArea: Story = {
    args: {
        data: percentStackAreaData,
        xField: 'year',
        yField: 'value',
        seriesField: 'country',
        pattern: {
            type: 'line',
        },
    },
};