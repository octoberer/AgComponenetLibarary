import type { Meta, StoryObj } from '@storybook/react';
import SortBar from './sortBar';

const meta = {
    title: 'Echarts/SortBar',
    component: SortBar,
    tags: ['autodocs'],
    argTypes: {
        sortDimension: {
            options: ['name', 'age', 'profession', 'score', 'date'],
            control: { type: 'radio' },
        },
    },
} satisfies Meta<typeof SortBar>;

type Story = StoryObj<typeof meta>;
export default meta;
export const Default: Story = {
    args: {
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        sourceData: [
            ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
            ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
            ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
            ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
            ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
            ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
            ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
            ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
            ['Han Meimei', 67, 'Engineer', 366, '2011-03-12'],
        ],
        sortDimension: 'score',
        XDimension: 'name',
        YDimension: 'score',
    },
};
