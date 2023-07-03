import * as echarts from 'echarts/core';
import { DatasetComponent, GraphicComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';

echarts.use([DatasetComponent, GraphicComponent, GridComponent, BarChart, CanvasRenderer]);

interface BarRaceType {
    /**
     * 是一个二维数组，其中数组第一项是维度，后续都是依照维度所对应的数据；其中0=》比较数据，1=》比较主体，2=》比较时段
     */
    data: any[][];
     /**
     * 表示数据从第几年（种）开始，一般为0，这里0代表的意思就是从数据中第一个年份2009开始
     */
    startIndex: number;
     /**
     * 表示比较主体各自代表哪些颜色，键为比较主体，值为颜色
     */
    colors: { [x: string]: string };
}
const uniqueId = getUniqueId();
const defaultData = [
    ['Income', 'Country', 'Year'],
    [100938.95992759791, 'china', 2009],
    [106770.88529530921, 'china', 2010],
];
export default function BarRace({ data = defaultData, startIndex, colors }: BarRaceType) {
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
        const years = [...yearsSet];
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
                    return d[2] === startIndex + years[0];
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
