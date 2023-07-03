import type { Meta, StoryObj } from '@storybook/react';
import BasicBarChart from './basicBarChart';

const meta = {
    title: 'Echarts/basicBarChart',
    component: BasicBarChart,
    tags: ['autodocs'],
    argTypes: {
        markPointSymbol: {
            options: ['circle' , 'rect' , 'roundRect','triangle','diamond' , 'pin','arrow' ,'none'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof BasicBarChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        xAxisData: ['2012', '2013', '2014', '2015', '2016'],
        seriesdata: [
            {
                name: 'Forest',
                data: [320, 332, 301, 334, 390],
            },
        ],
        legend: true,
        title: {
            text: 'test',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            position: 'top',
            axisPointer: {
                type: 'line',
            },
        },
        markPointSymbol: 'pin',
        markLine: true,
        barWidth:'30'
    },
};
