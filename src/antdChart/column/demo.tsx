import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { percent } from '../../commonType';
import { each, groupBy } from '@antv/util';
import { color, dataType, label, xAxis, yAxis } from '../commomType';
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
    data: dataType;
    /**
     *   可选。xAxis的配置项
     */
    xAxis?:xAxis;
    /**
     *   可选。yAxis的配置项
     */
    yAxis?: yAxis;
    /**
     *   可选。为数据维度配置别名，用于显示和tooltip的name值
     */
    meta?: {
        [x: string]: { alias: string };
    };
    /**
     *   可选。设置column的标签位置和样式
     */
    label?: label;
    /**
     *   可选。两种方式设置column的颜色，一是回调函数，其传参为传入数据的item，二是颜色数组，控制多个系列呈现不同颜色
     */
    color?:color;
    /**
     *   可选。设置column的圆角效果
     */
    columnStyle?: {
        radius: [number, number, number, number];
    };
    /**
     *   可选。是否开启滚动条
     */
    hasScrollbar?: boolean;
    /**
     *   可选。是否开启转化tag功能。这个是用在数据具有流动的情境
     */
    hasConversionTag?: boolean;
    /**
     *   可选。设置column的宽度，如0.8，表示宽度为实际所占位置的80%
     */
    columnWidthRatio?: percent;
    /**
     *   可选。是否开启缩略轴，也可传入初始化的start和end
     */
    slider?:
        | boolean
        | {
              start: percent;
              end: percent;
          };
    /**
     *   可选。是否开启堆叠效果
     */
    isStack?: boolean;
    /**
     *   可选。是否添加column的背景
     */
    hasColumnBackground?: boolean;
    /**
     *   可选。是否添加当与某个系列交互所产生的阴影连动区域
     */
    connectedArea?: boolean;
    /**
     *   可选。是否在column顶部添加总数label
     */
    hasSumLabel?: boolean;
    // 分组参数
    /**
     *   可选。是否开启分组效果，如果既不开启分组也不开启堆叠，多个系列会重叠在一列中
     */
    isGroup?: boolean;
    /**
     *   可选。如果同时开启堆叠和分组，需要设置该字段。按照先分组，再堆叠的顺序对数据进行排列
     */
    groupField?: string;
    tooltip?: {
        formatter: (item: any) => {
            name: string;
            value: string;
        };
    };
    /**
     *   可选。分组柱状图 组内柱子间的间距 (像素级别)
     */
    dodgePadding?: number;
    /**
     *   可选。分组柱状图 组间的间距 (像素级别)
     */
    intervalPadding?: number;
    /**
     *   可选。是否开启百分比显示
     */
    isPercent?: boolean;
    /**
     *   可选。是否开启区间柱状图，这要求data中yaxis字段所指向的值是一个长度为2的数组
     */
    isRange?: boolean;
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
    isStack,
    isGroup,
    groupField,
    tooltip,
    isPercent,
    isRange
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
        isStack,
        isGroup,
        groupField,
        tooltip,
        isPercent,
        isRange
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
    if (connectedArea && isStack) {
        config = Object.assign(config, {
            interactions: [
                {
                    type: 'element-highlight-by-color',
                },
                {
                    type: 'element-link',
                },
            ],
        });
    }
    if (hasSumLabel && isStack) {
        const annotations = getSumLabel(data, xField);
        config = Object.assign(config, { annotations });
    }
    if (isPercent) {
        config = Object.assign(config, {
            label: {
                ...config.label,
                content: (item) => {
                    return item.value.toFixed(2);
                },
            },
        });
    }
    return <Column {...config} />;
};
