import type { Meta, StoryObj } from '@storybook/react';
import BarRace from './BarRace';
import { BarRacedata } from '../../data';
const colors={ china: '#FF6E76', japan: '#FDDD60', american: '#58D9F9', england: '#7CFFB2' }
const meta = {
    title: 'Echarts/BarRace',
    component: BarRace,
    tags: ['autodocs'],
} satisfies Meta<typeof BarRace>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        data: BarRacedata,
        startIndex: 0,
        colors,
    },
};
