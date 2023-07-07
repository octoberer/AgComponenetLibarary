import type { Meta, StoryObj } from '@storybook/react';
import { DemoLine } from './basicLine';
import { linedata } from '../../data';
const meta = {
    title: 'Antd/DemoLine',
    component: DemoLine,
    tags: ['autodocs'],
} satisfies Meta<typeof DemoLine>;

type Story = StoryObj<typeof meta>;

export default meta;
export const Default: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        xAxis: undefined,
        yAxis: undefined,
        seriesField: 'scales',
        pointshape: 'circle',
        smooth: false,
        activeEmphasize: true,
        slider: false,
        salientPoint: undefined,
        medianFlag: false,
        point: undefined,
        annotations: undefined,
    },
};
export const SalientPoint: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        seriesField: 'scales',
        salientPoint: {
            name: 'test',
            conditions: [
                ['Date', '2010-04'],
                ['scales', 1818],
            ],
        },
        medianFlag: false,
        point: undefined,
        annotations: undefined,
    },
};
export const Slider: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        slider: true,
    },
};
export const Median: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
        yAxis: undefined,
        // seriesField: 'scales',
        pointshape: 'circle',
        smooth: false,
        activeEmphasize: true,
        slider: false,
        medianFlag: true,
        point: undefined,
        annotations: undefined,
    },
};
export const Axis: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            nice: true,
            // tickCount: 8,
            // 文本标签
            label: {
                autoRotate: false,
                offset: 10,
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                },
                formatter: (name) => name,
            },
            title: {
                text: '年份',
                style: {
                    fontSize: 16,
                },
            },
            tickLine: {
                style: {
                    lineWidth: 2,
                    stroke: '#aaa',
                },
                length: 5,
            },
        },
        // Y 轴相关配置
        yAxis: {
            // max: 3000,
            // 文本标签
            label: {
                autoRotate: false,
                style: {
                    fill: '#aaa',
                    fontSize: 12,
                },
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
            title: {
                text: '排放量(顿)',
                style: {
                    fontSize: 16,
                },
            },
            tickLine: {
                style: {
                    lineWidth: 2,
                    stroke: '#aaa',
                },
                length: 5,
            },
        },
        pointshape: 'circle',
        smooth: false,
        medianFlag: false,
        point: undefined,
        annotations: undefined,
    },
};
export const Annotations: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
        yAxis: undefined,
        // seriesField: 'scales',
        pointshape: 'circle',
        smooth: false,
        activeEmphasize: true,
        slider: false,
        medianFlag: false,
        point: undefined,
        annotations: [
            // 辅助线
            {
                type: 'line',
                start: ['0%', '0%'],
                end: ['100%', '0%'],
                style: {
                    stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
                    lineWidth: 2,
                },
            }, // 辅助区域
            {
                type: 'region',
                start: ['0%', '90%'],
                end: ['20%', '100%'],
                style: {
                    fill: '#1890ff',
                    fillOpacity: 1,
                    opacity: 1,
                },
            }, // 辅助文本
            {
                type: 'text',
                position: ['10%', '95%'],
                content: '二氧化碳排放量',
                style: {
                    fill: '#fff',
                    fontSize: 12,
                    textAlign: 'center',
                },
            }, // 辅助线
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: 'Turquoise',
                    lineDash: [4, 2],
                },
            },
        ],
    },
};
export const Point: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        point: {
            size: 5,
            style: {
                lineWidth: 1,
                fillOpacity: 1,
            },
            shape: (item) => {
                debugger;
                const year = parseInt(item.Date.split('_')[0]);
                if (year > 2011) {
                    return 'circle';
                }
                return 'diamond';
            },
        },
    },
};
export const Animation: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        animation: {
            // 配置图表第一次加载时的入场动画
            appear: {
                animation: 'wave-in', // 动画效果
                duration: 5000, // 动画执行时间
            },
        },
    },
};
export const LineStyle: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        lineStyle: ({ scales }) => {
                return {
                    lineDash: [4, 4],
                    opacity: 1,
                };
        },
    },
};
export const StepLine: Story = {
    args: {
        data: linedata,
        xField: 'Date',
        yField: 'scales',
        stepType: 'vh',

    },
};
