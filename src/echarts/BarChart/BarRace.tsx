import * as echarts from 'echarts/core';
import { DatasetComponent, GraphicComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';

echarts.use([DatasetComponent, GraphicComponent, GridComponent, BarChart, CanvasRenderer]);

interface BarRaceType {
    // 数组第一项为key组，后续每一个是其对应的数据
    options: { data: any[][]; startIndex: number; colors: { [x: string]: string } };
}
const uniqueId = getUniqueId();
export default function BarRace({ options }: BarRaceType) {
    const { data, startIndex, colors } = options;
    useEffect(() => {
        // debugger;
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;

        const updateFrequency = 2000;
        const yearsSet = new Set([]);
        for (let i = 1; i < data.length; ++i) {
            yearsSet.add(data[i][2]);
        }
        const years=[...yearsSet]
        option = {
            grid: {
                top: 10,
                bottom: 30,
                left: 150,
                right: 80,
            },
            xAxis: {
                max: 'dataMax',
                axisLabel: {
                    formatter: function (n: number) {
                        return Math.round(n) + '';
                    },
                },
            },
            dataset: {
                source: data.slice(1).filter(function (d) {
                    return d[2] === startIndex + 2009;
                }),
            },
            yAxis: {
                type: 'category',
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
            },
            series: [
                {
                    realtimeSort: true,
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    itemStyle: {
                        color: function (param: { value: string[] }) {
                            return colors[param.value[1]] || '#5470c6';
                        },
                    },
                    encode: {
                        x: 0,
                        y: 1,
                    },
                    label: {
                        show: true,
                        precision: 1,
                        position: 'right',
                        valueAnimation: true,
                    },
                },
            ],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [
                    {
                        type: 'text',
                        right: 160,
                        bottom: 60,
                        style: {
                            text: startIndex,
                            font: 'bolder 80px monospace',
                            fill: 'rgba(100, 100, 100, 0.25)',
                        },
                        z: 100,
                    },
                ],
            },
        };
        myChart.setOption(option);
        // debugger;
        for (let i = startIndex; i < years.length - 1; ++i) {
            (function (i) {
                setTimeout(function () {
                    // debugger;
                    updateYear(years[i + 1]);
                }, (i - startIndex) * updateFrequency);
            })(i);
        }
        function updateYear(year: any) {
            let source = data.slice(1).filter(function (d) {
                return d[2] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            myChart.setOption(option);
        }

        option && myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
