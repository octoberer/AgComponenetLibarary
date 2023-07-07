import type { Meta, StoryObj } from '@storybook/react';
import { DemoBar } from './Bar';
const meta = {
    title: 'Antd/DemoBar',
    component: DemoBar,
    tags: ['autodocs'],
} satisfies Meta<typeof DemoBar>;

type Story = StoryObj<typeof meta>;
export default meta;
const data = [
    {
        year: '1951 年',
        value: 38,
    },
    {
        year: '1952 年',
        value: 52,
    },
    {
        year: '1956 年',
        value: 61,
    },
    {
        year: '1957 年',
        value: 145,
    },
    {
        year: '1958 年',
        value: 48,
    },
];
export const Default: Story = {
    args: {
        data: data,
        xField: 'value',
        yField: 'year',
        xAxis: undefined,
        yAxis: undefined,
        label: {
            content: (originData) => {
                const value = originData.sales as number;
                if (value < 40) {
                    return '少';
                }
            },
            position: 'bottom',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        hasScrollbar: false,
        hasConversionTag: false,
    },
};
export const Stack: Story = {
    args: {
        data: [
            {
                year: '1991',
                value: 3,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 4,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Lon',
            },
            {
                year: '1994',
                value: 5,
                type: 'Lon',
            },
            {
                year: '1995',
                value: 4.9,
                type: 'Lon',
            },
            {
                year: '1996',
                value: 6,
                type: 'Lon',
            },
            {
                year: '1997',
                value: 7,
                type: 'Lon',
            },
            {
                year: '1998',
                value: 9,
                type: 'Lon',
            },
            {
                year: '1999',
                value: 13,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 3,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 4,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Bor',
            },
            {
                year: '1994',
                value: 5,
                type: 'Bor',
            },
            {
                year: '1995',
                value: 4.9,
                type: 'Bor',
            },
            {
                year: '1996',
                value: 6,
                type: 'Bor',
            },
            {
                year: '1997',
                value: 7,
                type: 'Bor',
            },
            {
                year: '1998',
                value: 9,
                type: 'Bor',
            },
            {
                year: '1999',
                value: 13,
                type: 'Bor',
            },
        ],
        xField: 'value',
        yField: 'year',
        xAxis: undefined,
        yAxis: undefined,
        seriesField: 'type',
        label: {
            content: (originData) => {
                const value = originData.sales as number;
                if (value < 40) {
                    return '少';
                }
            },
            position: 'bottom',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        isStack: true,
    },
};

export const Group: Story = {
    args: {
        data: [
            {
                label: 'Mon.',
                type: 'series1',
                value: 2800,
            },
            {
                label: 'Mon.',
                type: 'series2',
                value: 2260,
            },
            {
                label: 'Tues.',
                type: 'series1',
                value: 1800,
            },
            {
                label: 'Tues.',
                type: 'series2',
                value: 1300,
            },
            {
                label: 'Wed.',
                type: 'series1',
                value: 950,
            },
            {
                label: 'Wed.',
                type: 'series2',
                value: 900,
            },
            {
                label: 'Thur.',
                type: 'series1',
                value: 500,
            },
            {
                label: 'Thur.',
                type: 'series2',
                value: 390,
            },
            {
                label: 'Fri.',
                type: 'series1',
                value: 170,
            },
            {
                label: 'Fri.',
                type: 'series2',
                value: 100,
            },
        ],
        isGroup: true,
        xField: 'value',
        yField: 'label',
        seriesField: 'type',
        dodgePadding: 4,
        intervalPadding: 20,
    },
};
export const Percent: Story = {
    args: {
        data: [
            {
                label: 'Mon.',
                type: 'series1',
                value: 2800,
            },
            {
                label: 'Mon.',
                type: 'series2',
                value: 2260,
            },
            {
                label: 'Tues.',
                type: 'series1',
                value: 1800,
            },
            {
                label: 'Tues.',
                type: 'series2',
                value: 1300,
            },
            {
                label: 'Wed.',
                type: 'series1',
                value: 950,
            },
            {
                label: 'Wed.',
                type: 'series2',
                value: 900,
            },
            {
                label: 'Thur.',
                type: 'series1',
                value: 500,
            },
            {
                label: 'Thur.',
                type: 'series2',
                value: 390,
            },
            {
                label: 'Fri.',
                type: 'series1',
                value: 170,
            },
            {
                label: 'Fri.',
                type: 'series2',
                value: 100,
            },
        ],
        xField: 'value',
        yField: 'label',
        seriesField: 'type',
        isPercent: true,
        isStack:true
    },
};
export const Range: Story = {
    args: {
        data: [
            {
              type: '分类一',
              values: [76, 100],
            },
            {
              type: '分类二',
              values: [56, 108],
            },
            {
              type: '分类三',
              values: [38, 129],
            },
            {
              type: '分类四',
              values: [58, 155],
            },
            {
              type: '分类五',
              values: [45, 120],
            },
            {
              type: '分类六',
              values: [23, 99],
            },
            {
              type: '分类七',
              values: [18, 56],
            },
            {
              type: '分类八',
              values: [18, 34],
            },
          ],
        xField: 'values',
        yField: 'type',
        isRange:true
    },
};
