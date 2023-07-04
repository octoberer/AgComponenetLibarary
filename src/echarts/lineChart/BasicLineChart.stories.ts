import type { Meta, StoryObj } from '@storybook/react';
import LineChart from './BasicLineChart';

const meta = {
    title: 'Echarts/LineChart',
    component: LineChart,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Oneline: Story = {
    args: {
        xAxisData: [
            '00:00',
            '01:15',
            '02:30',
            '03:45',
            '05:00',
            '06:15',
            '07:30',
            '08:45',
            '10:00',
            '11:15',
            '12:30',
            '13:45',
            '15:00',
            '16:15',
            '17:30',
            '18:45',
            '20:00',
            '21:15',
            '22:30',
            '23:45',
        ],
        seriesData: [
            {
                name: 'Electricity',
                smooth: true,
                areaStyle:true,
                // prettier-ignore
                data: [300, 280, 250, 260, 270, 300, 850, 800, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            },
        ],
        legend: true,
        tooltip: true,
        
    },
};
export const Richline: Story = {
    args: {
        xAxisData: [
            '00:00',
            '01:15',
            '02:30',
            '03:45',
            '05:00',
            '06:15',
            '07:30',
            '08:45',
            '10:00',
            '11:15',
            '12:30',
            '13:45',
            '15:00',
            '16:15',
            '17:30',
            '18:45',
            '20:00',
            '21:15',
            '22:30',
            '23:45',
        ],
        seriesData: [
            {
                name: 'Electricity',
                smooth: true,
                // prettier-ignore
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
                markAreaData: [
                    [
                        {
                            name: 'Morning Peak',
                            xAxis: '07:30',
                        },
                        {
                            xAxis: '10:00',
                        },
                    ],
                    [
                        {
                            name: 'Evening Peak',
                            xAxis: '17:30',
                        },
                        {
                            xAxis: '21:15',
                        },
                    ],
                ],
            },
            {
                name: 'other',
                smooth: true,
                // prettier-ignore
                data: [300, 280, 550, 260, 270, 390, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
                markAreaData: [
                    [
                        {
                            name: 'Morning Peak',
                            xAxis: '07:30',
                        },
                        {
                            xAxis: '10:00',
                        },
                    ],
                    [
                        {
                            name: 'Evening Peak',
                            xAxis: '17:30',
                        },
                        {
                            xAxis: '21:15',
                        },
                    ],
                ],
            },
        ],
        legend: true,
        tooltip: true,
        visualMap: [
            {
                min: 3,
                max: 8,
                color: 'red',
                seriesIndex: 0,
            },
        ],
    },
};
