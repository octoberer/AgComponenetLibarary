import type { Meta, StoryObj } from '@storybook/react';
import GradeGauge from './GradeGauge';

const meta = {
    title: 'Echarts/GradeGauge',
    component: GradeGauge,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof GradeGauge>;

type Story = StoryObj<typeof meta>;
export default meta;
export const ONE: Story = {
    args: {
        Grades: ['Grade A', 'Grade B', 'Grade C', 'Grade D','Grade E'],
        data: [
            {
                value: 0.7,
                name: 'Grade Rating',
            }
        ],
    },
};
export const TWO: Story = {
    args: {
        Grades: ['Grade A', 'Grade B', 'Grade C', 'Grade D'],
        data: [
            {
                value: 0.7,
                name: 'Grade Rating',
            },
            {
                value: 0.1,
                name: 'Grade 12',
            },
        ],
    },
};
export const THREE: Story = {
    args: {
        Grades: ['Grade A', 'Grade B', 'Grade C', 'Grade D','Grade E'],
        data: [
            {
                value: 0.7,
                name: 'Grade Rating',
            },
            {
                value: 0.1,
                name: 'Grade 12',
            },
            {
                value: 0.5,
                name: 'xxxxx',
            },
        ],
    },
};
