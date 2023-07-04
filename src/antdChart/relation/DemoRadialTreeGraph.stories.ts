
import type { Meta, StoryObj } from '@storybook/react';
import { AntdRadialTreeGraph } from './DemoRadialTreeGraph';
const meta = {
    title: 'Antd/AntdRadialTreeGraph',
    component: AntdRadialTreeGraph,
    tags: ['autodocs'],
} satisfies Meta<typeof AntdRadialTreeGraph>;

type Story = StoryObj<typeof meta>;
const data = {
    id: 'Modeling Methods',
    children: [
        {
            id: 'Classification',
            children: [
                { id: 'Logistic regression', value: 'Logistic regression' },
                { id: 'Linear discriminant analysis', value: 'Linear discriminant analysis' },
                { id: 'Rules', value: 'Rules' },
                { id: 'Decision trees', value: 'Decision trees' },
                { id: 'Naive Bayes', value: 'Naive Bayes' },
                { id: 'K nearest neighbor', value: 'K nearest neighbor' },
                { id: 'Probabilistic neural network', value: 'Probabilistic neural network' },
                { id: 'Support vector machine', value: 'Support vector machine' },
            ],
            value: 'Classification',
        },
        {
            id: 'Consensus',
            children: [
                {
                    id: 'Models diversity',
                    children: [
                        { id: 'Different initializations', value: 'Different initializations' },
                        { id: 'Different parameter choices', value: 'Different parameter choices' },
                        { id: 'Different architectures', value: 'Different architectures' },
                        { id: 'Different modeling methods', value: 'Different modeling methods' },
                        { id: 'Different training sets', value: 'Different training sets' },
                        { id: 'Different feature sets', value: 'Different feature sets' },
                    ],
                    value: 'Models diversity',
                },
                {
                    id: 'Methods',
                    children: [
                        { id: 'Classifier selection', value: 'Classifier selection' },
                        { id: 'Classifier fusion', value: 'Classifier fusion' },
                    ],
                    value: 'Methods',
                },
                {
                    id: 'Common',
                    children: [
                        { id: 'Bagging', value: 'Bagging' },
                        { id: 'Boosting', value: 'Boosting' },
                        { id: 'AdaBoost', value: 'AdaBoost' },
                    ],
                    value: 'Common',
                },
            ],
            value: 'Consensus',
        },
        {
            id: 'Regression',
            children: [
                { id: 'Multiple linear regression', value: 'Multiple linear regression' },
                { id: 'Partial least squares', value: 'Partial least squares' },
                {
                    id: 'Multi-layer feedforward neural network',
                    value: 'Multi-layer feedforward neural network',
                },
                { id: 'General regression neural network', value: 'General regression neural network' },
                { id: 'Support vector regression', value: 'Support vector regression' },
            ],
            value: 'Regression',
        },
    ],
    value: 'Modeling Methods',
}
export default meta;
export const Default: Story = {
    args: {
        data:data
    },
};
