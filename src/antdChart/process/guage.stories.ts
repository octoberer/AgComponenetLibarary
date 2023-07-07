import type { Meta, StoryObj } from '@storybook/react';
import { AntdGauge } from './gauge';
const meta = {
    title: 'Antd/Gauge',
    component: AntdGauge,
    tags: ['autodocs'],
} satisfies Meta<typeof AntdGauge>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        percent: 0.75,
        range: {
            color: '#30BF78',
        },
        indicatorType: 'clockwithcircle',
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        meter: false,
    },
};
export const widthChange: Story = {
    args: {
        percent: 0.75,
        range: {
            color: '#30BF78',
            width: 12,
        },
        indicatorType: 'clockwithcircle',
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        statistic: {
            title: '75%',
            content: '加载进度',
        },
    },
};
export const statisticSet: Story = {
    args: {
        percent: 0.75,
        range: {
            color: '#30BF78',
            width: 12,
        },
        // indicatorType: 'clockwithcircle',
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        statistic: {
            title: '75%',
            content: '加载进度',
        },
    },
};
export const statisticUpdate: Story = {
    args: {
        percent: 0.65,
        // range: {
        //     color: '#30BF78',
        //     width: 12,
        // },
        // axis: {
        //     label: {
        //         formatter(v) {
        //             return Number(v) * 100;
        //         },
        //     },
        //     subTickLine: {
        //         count: 3,
        //     },
        // },
        statistic: {
            title: ['差', '中', '良', '优', '极好'],
            content: '系统表现',
        },
        meter: false,
    },
};
