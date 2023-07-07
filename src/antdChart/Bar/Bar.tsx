import { Bar } from '@ant-design/plots';
import { color, label, legend, xAxis, yAxis } from '../commomType';

interface DemoBarType {
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
        [x: string]: string | number | [number, number];
    }[];
    /**
     *   可选。xAxis的配置项
     */
    xAxis?: xAxis;
    /**
     *   可选。yAxis的配置项
     */
    yAxis?: yAxis;
    /**
     *   可选。调正legend的位置或者添加名字，如不想显示，可传入false
     */
    legend?: legend;
    /**
     *   可选。两种方式设置column的颜色，一是回调函数，其传参为传入数据的item，二是颜色数组，控制多个系列呈现不同颜色
     */
    color?: color;
    /**
     *   可选。设置bar的宽度，如0.8，表示宽度为实际所占位置的80%
     */
    barWidthRatio?: number;
    /**
     *   可选。是否开启滚动条
     */
    hasScrollbar?: boolean;
    /**
     *   可选。是否开启转化tag功能。这个是用在数据具有流动的情境
     */
    hasConversionTag?: boolean;
    /**
     *   可选。是否添加bar的背景
     */
    hasBarBackground?: boolean;
    label?: label;
    isStack?: boolean;
    isGroup?: boolean;
    barStyle?: {
        radius: [number, number, number, number];
    };
    /**
     *   可选。分组柱状图 组内柱子间的间距 (像素级别)
     */
    dodgePadding?: number;
    /**
     *   可选。分组柱状图 组间的间距 (像素级别)
     */
    intervalPadding?: number;
    isPercent?: boolean;
    /**
     *   可选。是否开启区间柱状图，这要求data中yaxis字段所指向的值是一个长度为2的数组
     */
    isRange?: boolean;
}
export const DemoBar = ({
    data,
    xField,
    yField,
    seriesField,
    legend,
    label = {},
    hasScrollbar,
    hasConversionTag,
    hasBarBackground,
    barWidthRatio,
    color,
    isStack,
    isGroup,
    isPercent,
    isRange,
    barStyle,
    dodgePadding,
    intervalPadding,
}: DemoBarType) => {
    let scrollbar, conversionTag;
    if (hasScrollbar) {
        scrollbar = {
            type: 'vertical',
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
        legend,
        scrollbar,
        barWidthRatio,
        color,
        barStyle,
        isStack,
        isGroup,
        isRange,
        isPercent,
        dodgePadding,
        intervalPadding,
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
    };
    if (hasBarBackground) {
        config = Object.assign(config, {
            barBackground: {
                style: {
                    fill: 'rgba(0,0,0,0.1)',
                },
            },
        });
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
    return <Bar {...config} />;
};
