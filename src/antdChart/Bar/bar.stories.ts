const data = [
    {
        type: '家具家电',
        sales: 38,
    },
    {
        type: '粮油副食',
        sales: 52,
    },
    {
        type: '生鲜水果',
        sales: 61,
    },
    {
        type: '美容洗护',
        sales: 145,
    },
    {
        type: '母婴用品',
        sales: 48,
    },
    {
        type: '进口食品',
        sales: 38,
    },
    {
        type: '食品饮料',
        sales: 38,
    },
    {
        type: '家庭清洁',
        sales: 38,
    },
];
import type { Meta, StoryObj } from '@storybook/react';
import { DemoColumn } from './demo';
import { antdChartStackbardata } from '../../data';
const meta = {
    title: 'Antd/Column',
    component: DemoColumn,
    tags: ['autodocs'],
} satisfies Meta<typeof DemoColumn>;

type Story = StoryObj<typeof meta>;
const paletteSemanticRed = '#F4664A';
const brandColor = '#5B8FF9';
export default meta;
export const Default: Story = {
    args: {
        data: data,
        xField: 'type',
        yField: 'sales',
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
        color: ({ type }) => {
            if (type === '美容洗护' || type === '家庭清洁') {
                return paletteSemanticRed;
            }
            return brandColor;
        },
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额',
            },
        },
        hasScrollbar: false,
        hasConversionTag: false,
        columnWidthRatio: 0.8,
        slider: true,
    },
};
export const ConversionTag: Story = {
    args: {
        data: [
            {
                action: '浏览网站',
                pv: 50000,
            },
            {
                action: '放入购物车',
                pv: 35000,
            },
            {
                action: '生成订单',
                pv: 25000,
            },
            {
                action: '支付订单',
                pv: 15000,
            },
            {
                action: '完成交易',
                pv: 8500,
            },
        ],
        xField: 'action',
        yField: 'pv',
        xAxis: undefined,
        yAxis: undefined,
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额',
            },
        },
        hasConversionTag: true,
    },
};

export const Stack: Story = {
    args: {
        data: antdChartStackbardata,
        isStack: true,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        xAxis: undefined,
        yAxis: undefined,
        // hasColumnBackground: true,
        connectedArea: true,
        hasSumLabel: true,
    },
};
