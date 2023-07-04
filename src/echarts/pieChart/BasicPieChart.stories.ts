import type { Meta, StoryObj } from '@storybook/react';
import BasicPieChart from './BasicChart';
import { basicPieData1 } from '../../data';

const meta = {
    title: 'Echarts/BasicPieChart',
    component: BasicPieChart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof BasicPieChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        title: {
            text: '标题',
            subtext: '副标题',
        },
        seriesdata: [
            {
                name: '饼图',
                radius: '70%',
                data: [...basicPieData1],
            },
        ],
    },
};

export const Vertical: Story = {
    args: {
        title: {
            text: '标题',
            subtext: '副标题',
        },
        seriesdata: [
            {
                name: '饼图',
                radius: '40%',
                data: [...basicPieData1],
                // half: true,
                // roseType: true,
                top: '5%',
                bottom: '61.6%',
                left: 'center',
            },
            {
                name: '饼图',
                radius: '40%',
                data: [...basicPieData1],
                // half: true,
                // roseType: true,
                top: '33.3%',
                bottom: '33.3%',

                left: 'center',
            },
            {
                name: '饼图',
                radius: '40%',
                data: [...basicPieData1],
                left: 'center',
                top: '66.6%',
                bottom: 0,
            },
        ],
    },
};

export const Horizontal: Story = {
    args: {
        title: {
            text: '标题',
            subtext: '副标题',
        },
        seriesdata: [
            {
                name: '饼图',
                radius: ['20%', '50%'],
                data: [...basicPieData1],
                // half: true,
                // roseType: true,
                left: 0,
                right: '66.6667%',
                top: 0,
                bottom: 0,
            },
            {
                name: '饼图',
                radius: ['20%', '50%'],
                data: [...basicPieData1],
                // half: true,
                // roseType: true,
                left: '33.3333%',
                right: '33.3333%',
                top: 0,
                bottom: 0,
            },
            {
                name: '饼图',
                radius: ['20%', '50%'],
                data: [...basicPieData1],
                // half: true,
                // roseType: true,
                left: '66.6667%',
                right: 0,
                top: 0,
                bottom: 0,
            },
        ],
    },
};
export const RoseShape: Story = {
    args: {
        title: {
            text: '标题',
            subtext: '副标题',
        },
        seriesdata: [
            {
                name: '饼图',
                radius: '80%',
                data: [...basicPieData1],
                roseType: true,
            },
        ],
    },
};
export const HalfPie: Story = {
    args: {
        title: {
            text: '标题',
            subtext: '副标题',
        },
        seriesdata: [
            {
                name: '饼图',
                radius: ['20%','80%'],
                data: [...basicPieData1],
                half: true,
                top:'10%'
            },
        ],
    },
};
