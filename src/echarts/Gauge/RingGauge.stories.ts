import type { Meta, StoryObj } from '@storybook/react';
import RingGauge from './RingGauge';
import { RingGaugeData } from '../../data';

const meta = {
    title: 'Echarts/RingGauge',
    component: RingGauge,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RingGauge>;

type Story = StoryObj<typeof meta>;
export default meta;
export const THREE: Story = {
    args: {
        RingGaugeData: RingGaugeData,
    },
};
export const TWO: Story = {
    args: {
        RingGaugeData: [
            {
                value: 40,
                name: 'Good',
                title: {
                    offsetCenter: ['0%', '0%'],
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '10%'],
                },
            },
            {
                value: 60,
                name: 'Commonly',
                title: {
                    offsetCenter: ['0%', '30%'],
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '40%'],
                },
            },
        ],
    },
};
export const Four: Story = {
    args: {
        RingGaugeData: [
            {
                value: 56,
                name: 'Perfect',
              },
            {
                value: 40,
                name: 'Good',
            },
            {
                value: 60,
                name: 'Commonly',
            },
            {
                value: 20,
                name: 'badly',
            },
        ],
    },
};
