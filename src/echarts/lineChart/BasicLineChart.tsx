import * as echarts from 'echarts';
import { useEffect } from 'react';

interface LineChartType {
    options: {
        xAxisData: string[];
        yAxisData:
            | string[][]
            | {
                  data: string[];
                  name: string;
                  step?: 'start' | 'middle' | 'end';
                  symbol?: 'triangle'|'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
                  symbolSize?: number;
                  lineStyle?: {
                      color: string;
                      width: number;
                      type: 'dashed'|'solid'|'dotted';
                  };
                  itemStyle?: {
                      borderWidth: number;
                      borderColor: string;
                      color: string;
                  };
              }[];
        smooth?: boolean;
        areaStyle?: boolean;
        toolbox?: boolean;
        boundaryGap?: boolean;
        legend?: boolean;
        tooltip?: boolean;
        markPoint?: { symbol: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' };
        visualMap?: {
            gt: number;
            lt: number;
            color: string;
        }[];
    };
    domId: string;
}

export default function LineChart({ options, domId }: LineChartType) {
    const { xAxisData, yAxisData, smooth, areaStyle, boundaryGap, legend, tooltip, markPoint, visualMap } = options;
    useEffect(() => {
        var chartDom = document.getElementById(domId) as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                boundaryGap,
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
            },
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
                : undefined,
            series: yAxisData.map((singleYAxisData) => {
                if (Array.isArray(singleYAxisData)) {
                    return {
                        data: singleYAxisData,
                        type: 'line',
                        smooth: smooth,
                        areaStyle: areaStyle ? {} : null,
                        markPoint: {
                            symbol: markPoint?.symbol,
                            data: [{ type: 'average', name: 'average' }],
                        },
                    };
                }
                const { name, data } = singleYAxisData;
                return {
                    name,
                    data,
                    type: 'line',
                    smooth: smooth,
                    areaStyle: areaStyle ? {} : null,
                };
            }),
        };

        option && myChart.setOption(option);
    }, [options, domId]);

    return <div id={domId}></div>;
}
