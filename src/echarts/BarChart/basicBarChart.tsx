import * as echarts from 'echarts';
import { useEffect } from 'react';

interface BarChartType {
    options: {
        title: {
            text: string;
            subtext?: string;
        };
        xAxisData: string[];
        yAxisData:
            | string
            | {
                  value: number;
                  itemStyle?: {
                      borderWidth?: number;
                      borderColor?: string;
                      color: string;
                  };
              }[][]
            | {
                  data: string[];
                  name: string;
                  step?: 'start' | 'middle' | 'end';
                  symbol?: 'triangle' | 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
                  symbolSize?: number;
                  label: {
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
                  stack: string;
              }[];
        backgroundStyle?: {
            color: string;
            borderColor: string;
            borderWidth: number;
            borderType: 'dashed' | 'solid' | 'dotted';
            borderRadius: number | number[];
            opacity: number;
        };
        barWidth?: boolean;
        toolbox?: boolean;
        boundaryGap?: boolean;
        legend?: boolean;
        tooltip?: {
            trigger: 'axis' | 'none';
            position: 'inside' | 'top' | 'left' | 'right' | 'bottom';
            axisPointer?: {
                type: 'shadow' | 'line' | 'cross';
            };
            formatter?: (params: {
                seriesName: string;
                // 数据名，类目名
                name: string;
                // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
                data: string;
            }) => string;
        };
        markPoint?: { symbol: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' };
        markLine?: boolean;
        visualMap?: {
            gt: number;
            lt: number;
            color: string;
        }[];
        alignWithLabel?: boolean;
        yAxis?:{formatterunit:string}
    };
    domId: string;
}

export default function BarChart({ options, domId }: BarChartType) {
    const {
        xAxisData,
        yAxisData,
        backgroundStyle,
        boundaryGap,
        legend,
        tooltip,
        title,
        visualMap,
        alignWithLabel = false,
        barWidth,
        toolbox,
        markPoint,
        markLine,
        yAxis
    } = options;
    useEffect(() => {
        var chartDom = document.getElementById(domId) as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title,
            xAxis: {
                type: 'category',
                boundaryGap,
                data: xAxisData,
                axisTick: {
                    alignWithLabel,
                },
            },
            yAxis:  yAxis?{
                type: 'value',
                axisLabel: {
                    formatter: '{value} '+yAxis.formatterunit,
                },
            }:{},

            visualMap: visualMap
                ? {
                      type: 'piecewise',
                      show: false,
                      dimension: 0,
                      seriesIndex: 0,
                      pieces: visualMap,
                  }
                : undefined,
            legend: legend ? {} : undefined,
            tooltip: tooltip
                ? {
                      trigger: 'axis',
                  }
                : {},
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },

            series: yAxisData.map((singleYAxisData) => {
                if (Array.isArray(singleYAxisData)) {
                    return {
                        data: singleYAxisData,
                        type: 'bar',
                        barWidth,
                        showBackground: true,
                        backgroundStyle,
                    };
                }
                const { name, data } = singleYAxisData;
                return {
                    name,
                    data,
                    barWidth,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle,
                    markPoint: {
                        symbol: markPoint?.symbol,
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' },
                        ],
                    },
                    markLine: {
                        data: [{ type: 'average', name: 'Avg' }],
                    },
                };
            }),
        };

        option && myChart.setOption(option);
    }, [options, domId]);

    return <div>lineChart</div>;
}
