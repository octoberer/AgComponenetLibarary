import type { Meta, StoryObj } from '@storybook/react';
import { AntdLiquid } from './liquid';
const meta = {
    title: 'Antd/Liquid',
    component: AntdLiquid,
    tags: ['autodocs'],
    argTypes: {
        shape: {
            options: ['circle' , 'rect' , 'roundRect','triangle','diamond'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof AntdLiquid>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        percent: 0.78,
        outline: {
            border: 4,
            distance: 8,
            style: {
                stroke: 'green',
                strokeOpacity: 0.65,
              },
        },
        wavelength:128,
        shape:  'rect',
        themeColor:'#FFC100'
    },
};
