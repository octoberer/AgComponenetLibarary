import type { Meta, StoryObj } from '@storybook/react';
import { AntdBullet } from './bullet';
const meta = {
    title: 'Antd/Bullet',
    component: AntdBullet,
    tags: ['autodocs'],
} satisfies Meta<typeof AntdBullet>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        data: [
            {
                title: '重庆',
                ranges: [30, 90, 120],
                measures: [65],
                target: 80,
            },
            {
                title: '杭州',
                ranges: [30, 90, 120],
                measures: [50],
                target: 100,
            },
            {
                title: '广州',
                ranges: [30, 90, 120],
                measures: [40],
                target: 85,
            },
            {
                title: '深圳',
                ranges: [30, 90, 120],
                measures: [50],
                target: 100,
            },
        ],
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
            measure: '#5B8FF9',
            target: '#39a3f4',
        },
    },
};
