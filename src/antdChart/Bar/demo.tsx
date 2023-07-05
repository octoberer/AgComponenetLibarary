import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { percent } from '../../commonType';
import { each, groupBy } from '@antv/util';
interface ColumnType {
    /**
     *   横坐标显示的维度名字
     */
    xField: string;
    /**
     *   纵坐标显示的维度名字
     */
    yField: string;
    /**
     *   可选。系列维度。在设置salientPoint的同时，必须设置该键
     */
    seriesField?: string;
    /**
     *   表数据，是多个维度对象组成的数组
     */
    data: {
        [x: string]: string | number;
    }[];
    xAxis?: {
        range?: [percent, percent];
        tickCount?: number;
        nice?: boolean;
        // tickCount: 8,
        // 文本标签
        label?: {
            autoRotate?: boolean;
            autoHide?: boolean;
            offset?: number;
            style?: {
                [x: string]: string | number;
            };
            formatter?: (name: string) => string;
        };
        title?: {
            text?: string;
            style?: {
                fontSize: number;
            };
        };
        tickLine?: {
            style?: {
                lineWidth: number;
                stroke: string;
            };
            length?: number;
        };
    };
    yAxis?: {
        label?: {
            autoRotate?: boolean;
            autoHide?: boolean;
            style?: {
                fill: string;
                fontSize: number;
            };
            formatter?: (value: any) => any;
        };
        title?: {
            text: string;
            style?: {
                fontSize: number;
            };
        };
        tickLine?: {
            style?: {
                lineWidth: number;
                stroke: '#aaa';
            };
            length: number;
        };
        max?: number;
    };
    meta?: {
        [x: string]: { alias: string };
    };
    /**
     *   可选。设置bar的标签位置和样式
     */
    label?: {
        // 可手动配置 label 数据标签位置
        position?: 'top' | 'middle' | 'bottom';
        // 配置样式
        style?: {
            fill?: string;
            opacity?: percent;
        };
        content?: (Data: { [x: string]: string | number }) => string | undefined;
    };
    color?: (Data: { [x: string]: string | number }) => string | undefined;
    hasScrollbar?: boolean;
    hasConversionTag?: boolean;
    columnWidthRatio?: percent;
    slider?:
        | boolean
        | {
              start: percent;
              end: percent;
          };
    isStack?: boolean;
    /**
     *   可选。是否添加bar的背景
     */
    hasColumnBackground?: boolean;
    /**
     *   可选。是否添加当与某个系列交互所产生的阴影连动区域
     */
    connectedArea?: boolean;
    hasSumLabel?: boolean;
}
const getSumLabel = (data: unknown[], xField: string) => {
    const annotations: any[] = [];
    each(groupBy(data, xField), (values, k) => {
        const value = values.reduce((a: any, b: { value: any }) => a + b.value, 0);
        annotations.push({
            type: 'text',
            position: [k, value],
            content: `${value}`,
            style: {
                textAlign: 'center',
                fontSize: 14,
                fill: 'rgba(0,0,0,0.85)',
            },
            offsetY: -10,
        });
    });
    return annotations;
};
export const DemoColumn = ({
    data,
    xField,
    yField,
    seriesField,
    label = {},
    xAxis = {},
    yAxis = {},
    meta,
    hasScrollbar = false,
    hasConversionTag = false,
    color,
    columnWidthRatio,
    slider,
    hasColumnBackground = false,
    connectedArea = false,
    hasSumLabel = false,
    isStack
}: ColumnType) => {
    let scrollbar, conversionTag;
    if (hasScrollbar) {
        scrollbar = {
            type: 'horizontal',
        };
    }
    if (hasConversionTag) {
        conversionTag = {};
    }

    let config = {
        data,
        xField,
        yField,
        seriesField,
        label: {
            ...label,
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
        xAxis,
        yAxis,
        meta,
        scrollbar,
        conversionTag,
        color,
        columnWidthRatio,
        isStack
    };
    if (typeof slider === 'object') {
        config = Object.assign(config, slider);
    } else if (slider) {
        config = Object.assign(config, { slider: {} });
    }
    if (hasColumnBackground) {
        config = Object.assign(config, {
            interactions: [
                {
                    type: 'active-region',
                    enable: false,
                },
            ],
            columnBackground: {
                style: {
                    fill: 'rgba(0,0,0,0.1)',
                },
            },
        });
    }
    if (connectedArea) {
        config = Object.assign(config, {
            interactions: [
                {
                    type: 'active-region',
                    enable: false,
                },
            ],
            connectedArea: {
                style: (oldStyle, element) => {
                    return {
                        fill: 'rgba(0,0,0,0.25)',
                        stroke: oldStyle.fill,
                        lineWidth: 0.5,
                    };
                },
            },
        });
    }
    if (hasSumLabel) {
        const annotations = getSumLabel(data, xField);
        config = Object.assign(config, { annotations });
    }
    return <Column {...config} />;
};
