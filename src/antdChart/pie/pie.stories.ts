import type { Meta, StoryObj } from '@storybook/react';
import { DemoPie } from './pie';
const meta = {
    title: 'Antd/Pie',
    component: DemoPie,
    tags: ['autodocs'],
} satisfies Meta<typeof DemoPie>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        data: [
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        innerRadius: undefined,
        startAngle: undefined,
        endAngle: undefined,
        pieStyle: undefined,
        pieBackPic: undefined,
        innerContent: undefined,
    },
};
export const Spider: Story = {
    args: {
        data: [
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        richlabel: true,
    },
};
export const notfullPie: Story = {
    args: {
        data: [
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        // 设置圆弧起始角度
        startAngle: Math.PI,
        endAngle: Math.PI * 1.5,
        label: {
            type: 'inner',
            content: '{name}',
            style: {
                fontSize: 18,
            },
        },
        pieStyle: {
            lineWidth: 0,
        },
    },
};
export const selfPic: Story = {
    args: {
        data: [
            {
                sex: '男',
                sold: 0.45,
            },
            {
                sex: '女',
                sold: 0.55,
            },
        ],
        angleField: 'sold',
        colorField: 'sex',
        radius: 0.8,
        label: {
            type: 'inner',
            style: {
                fill: '#fff',
                fontSize: 18,
                textAlign: 'center',
            },
        },
        pieBackPic: [
            `https://gw.alipayobjects.com/zos/antfincdn/FioHMFgIld/pie-wenli1.png`,
            `https://gw.alipayobjects.com/zos/antfincdn/Ye2DqRx%2627/pie-wenli2.png`,
        ],
    },
};
export const TitledCircle: Story = {
    args: {
        data: [
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        innerContent:'我的饼图'
    },
};
export const richCircle: Story = {
    args: {
        data: [
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        innerContent:{unit:'个数'}
    },
};