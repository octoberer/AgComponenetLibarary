import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
type dataType = string | number | { name?: string; value: string | number; itemStyle?: any; label?: any };

interface singleSeries {
    data: dataType[];
    name: string;
    step?: 'start' | 'middle' | 'end';
    symbol?: 'triangle' | 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
    symbolSize?: number;
    label?: {
        show: boolean;
        position: 'inside';
    };
    lineStyle?: {
        color: string;
        width: number;
        type: 'dashed' | 'solid';
    };
    itemStyle?: {
        borderWidth: number;
        borderColor: string;
        color: string;
    };
    stack?: string;
    barWidth?: string;
}
interface BarChartType {
    /**
     * 设置题目
     */
    title: {
        text: string;
        subtext?: string;
        left?: 'center' | 'left' | 'right';
    };
    /**
     * x轴数据
     */
    xAxisData: string[];
    /**
     * y轴数据
     */
    seriesdata: singleSeries[];
    /**
     * 设置bar的宽度，可以是百分比，也可以是个数字
     */
    barWidth?: string;
    /**
     * 是否提供交互工具
     */
    toolbox?: boolean;
    /**
     * 是否显示图示
     */
    legend?: boolean;
    /**
     * 定义鼠标移到某一项时，显示的内容，如何显示等信息。trigger指的是触发项,设置为none为关闭这个功能；formatter指显示的文字内容，axisPointer是指定位方式
     */
    tooltip?: {
        trigger: 'axis' | 'none';
        position: 'inside' | 'top' | 'left' | 'right' | 'bottom';
        axisPointer?: {
            type: 'shadow' | 'line' | 'cross';
        };
        formatter?: (params: { seriesName: string; name: string; data: string }) => string;
    };
    /**
     * 设置突出显示的节点形状
     */
    markPointSymbol?: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
    /**
     * 是否突出显示平均值
     */
    markLine?: boolean;
    /**
     * 设置某个区域的颜色，可设置多段
     */
    visualMap?: {
        min: number;
        max: number;
        color: string;
    }[];
    /**
     * 横坐标的内容与分割线是否居中
     */
    alignWithLabel?: boolean;
}
const uniqueId = getUniqueId();
export default function BasicBarChart({
    xAxisData,
    seriesdata,
    legend,
    tooltip,
    title,
    barWidth,
    markPointSymbol = 'pin',
    markLine,
}: BarChartType) {
    const myChartref=useRef<echarts.ECharts>()
    useEffect(() => {
        var chartDom = document.getElementById(uniqueId) as HTMLElement;
        myChartref.current = echarts.init(chartDom);
    }, []);
    useEffect(() => {
        var option;

        option = {
            title,
            xAxis: {
                type: 'category',
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
            },
            legend: legend ? { top: 'bottom' } : undefined,
            tooltip: tooltip
                ? tooltip
                : {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'shadow',
                      },
                  },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },

            series: seriesdata.map((singleYAxisData) => {
                return {
                    ...singleYAxisData,
                    markPoint: markPointSymbol
                        ? {
                              symbol: markPointSymbol,
                              data: [
                                  { type: 'max', name: 'Max' },
                                  { type: 'min', name: 'Min' },
                              ],
                          }
                        : undefined,
                    markLine: markLine
                        ? {
                              data: [{ type: 'average', name: 'Avg' }],
                          }
                        : undefined,
                    type: 'bar',
                    barWidth,
                };
            }),
        };
        option && myChartref.current?.setOption(option);
    }, [xAxisData, seriesdata, legend, tooltip, title, barWidth, (markPointSymbol = 'pin'), markLine]);

    return <div id={uniqueId} style={{ width: '1000px', height: '800px' }}></div>;
}
