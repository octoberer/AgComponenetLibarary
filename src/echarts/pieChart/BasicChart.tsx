import * as echarts from 'echarts';
import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
type percent = string | number;
type dataType = (string | number | { name?: string; value: string | number; itemStyle?: any; label?: any })[];
interface singleSeries {
    name?: string;
    left?: percent;
    right?: percent;
    top?: percent;
    bottom?: percent;
    radius?: percent | [percent, percent];
    data: dataType;
    emphasis?: {
        label?: any;
        itemStyle?: {
            shadowBlur?: number;
            shadowOffsetX?: number;
            shadowColor?: string;
        };
    };
    half?: boolean;
    roseType?: boolean;
    label?: {
        show?: boolean;
        position?: 'center';
        formatter?: (params: {
            seriesName: string;
            // 数据名，类目名
            name: string;
            // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
            data: string;
        }) => string;
    };
    type?: any;
    startAngle?: number;
    avoidLabelOverlap?: boolean;
    center?: [string, string];
}
interface BasicPieChartType {
    title: {
        text: string;
        subtext?: string;
    };
    seriesdata: singleSeries[];
}
const uniqueId = getUniqueId();
export default function BasicPieChart({ title, seriesdata }: BasicPieChartType) {
    useEffect(() => {
        // debugger;
        var chartDom = document.getElementById(uniqueId) as HTMLElement;
        var myChart = echarts.init(chartDom);
        var option;
        const getSeriesData = () => {
            // debugger;
            const tempSeriesdata = [];
            for (let singleSeriesData of seriesdata) {
                const { half, radius, emphasis } = singleSeriesData;
                if (half) {
                    const tempdata = [...singleSeriesData.data] as { value: number }[];
                    console.log('tempdata',tempdata)
                    const sum=tempdata.reduce((prev: any, item: { value: any }) => prev + item.value, 0)
                    const halfItemflag = tempdata.find((item) => item.label?.show===false);
                    if (!halfItemflag) {
                        const halfitem = {
                            // make an record to fill the bottom 50%
                            value: sum,
                            itemStyle: {
                                // stop the chart from rendering this piece
                                color: 'none',
                                decal: {
                                    symbol: 'none',
                                },
                            },
                            label: {
                                show: false,
                            },
                        };
                        tempdata.push(halfitem);
                        singleSeriesData.data = tempdata;
                        singleSeriesData.startAngle = 180;
                    }
                }
                singleSeriesData.label = singleSeriesData.label
                    ? {
                          show: singleSeriesData.label?.show || true,
                          formatter: singleSeriesData.label?.formatter
                              ? singleSeriesData.label?.formatter
                              : (param: { [x: string]: any }) => {
                                    // correct the percentage
                                    return half ? param.name + ' (' + param.percent * 2 + '%)' : param.name + ' (' + param.percent + '%)';
                                },
                      }
                    : {};
                if (Array.isArray(radius)) {
                    singleSeriesData.label = {
                        show: false,
                        position: 'center',
                    };
                    singleSeriesData.avoidLabelOverlap = false;
                    singleSeriesData.emphasis = {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                    };
                }
                singleSeriesData.emphasis = emphasis
                    ? { ...singleSeriesData.emphasis, ...emphasis }
                    : singleSeriesData.emphasis
                    ? {
                          ...singleSeriesData.emphasis,
                      }
                    : {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)',
                          },
                      };
                (singleSeriesData.center = ['50%', '50%']), (singleSeriesData.type = 'pie');
                tempSeriesdata.push(singleSeriesData);
            }
            return tempSeriesdata;
        };
        option = {
            title: {
                ...title,
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: getSeriesData(),
        };
        // debugger;
        option && myChart.setOption(option);
    }, [seriesdata]);

    return <div id={uniqueId} style={{ width: 1000, height: 600 }}></div>;
}
