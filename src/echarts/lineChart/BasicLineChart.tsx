import * as echarts from 'echarts';
import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
type dataType = string | number | { name?: string; value: string | number; itemStyle?: any; label?: any };

interface singleSeries {
    data: dataType[];
    name: string;
    symbol?: 'triangle' | 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
    symbolSize?: number;
    lineStyle?: {
        color: string;
        width: number;
        type: 'dashed' | 'solid' | 'dotted';
    };
    smooth?: boolean;
    areaStyle?: boolean;
    markMaxAndMinPointSymbol?: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
    markAverageLine?: boolean;
    markAreaData?: [
        {
            name: string;
            xAxis: string;
        },
        {
            xAxis: string;
        }
    ][];
}
interface LineChartType {
    xAxisData: string[];
    seriesData: singleSeries[];
    toolbox?: boolean;
    legend?: boolean;
    tooltip?: boolean;
    visualMap?: {
        min: number;
        max: number;
        color: string;
        seriesIndex: number;
    }[];
}
const uniqueId = getUniqueId();

export default function LineChart(props: LineChartType) {
    const { xAxisData, visualMap, seriesData, legend, tooltip } = props;
    useEffect(() => {
        var chartDom = document.getElementById(uniqueId) as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
            },
            visualMap: visualMap
                ? visualMap.map((item) => ({
                      type: 'piecewise',
                      show: false,
                      dimension: 0,
                      seriesIndex: item?.seriesIndex,
                      pieces: [item],
                  }))
                : undefined,
            legend: legend ? {} : undefined,
            tooltip: tooltip
                ? {
                      trigger: 'axis',
                  }
                : undefined,
            series: seriesData.map((singleYAxisData) => {
                const { markMaxAndMinPointSymbol, markAverageLine, markAreaData } = singleYAxisData;
                return {
                    ...singleYAxisData,
                    markPoint: markMaxAndMinPointSymbol
                        ? {
                              symbol: markMaxAndMinPointSymbol,
                              data: [
                                  { type: 'max', name: 'Max' },
                                  { type: 'min', name: 'Min' },
                              ],
                          }
                        : undefined,
                    markLine: markAverageLine
                        ? {
                              data: [{ type: 'average', name: 'Avg' }],
                          }
                        : undefined,
                    markArea: markAreaData
                        ? {
                              data: markAreaData,
                          }
                        : undefined,
                    type: 'line',
                };
            }),
        };

        option && myChart.setOption(option);
    }, []);

    return <div id={uniqueId} style={{ width: 800, height: 600 }}></div>;
}
