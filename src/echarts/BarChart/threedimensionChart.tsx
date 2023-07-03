import * as echarts from 'echarts/core';
import { useEffect } from 'react';
import { DatasetComponent, GridComponent, VisualMapComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { getUniqueId } from '../../utils/getUniqueId';

echarts.use([DatasetComponent, GridComponent, VisualMapComponent, BarChart, CanvasRenderer]);

interface SimpleEncodeType {
     /**
     * 二维数组，第一行是维度，其余每一行代表每个维度的值
     */
    data: [string | number, string | number, string | number][];
}
const uniqueId = getUniqueId();
export default function ThreedimensionChart({ data }: SimpleEncodeType) {
    useEffect(() => {
        // debugger;
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        const [dimension1, dimension2, dimension3] = data[0];
        // debugger
        option = {
            dataset: {
                source: data,
            },
            grid: { containLabel: true },
            xAxis: { name: dimension2 },
            yAxis: { type: 'category', name: dimension3 },
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                text: ['High ' + dimension1, 'Low ' + dimension1],
                dimension: dimension1,
                inRange: {
                    color: ['#65B581', '#FFCE34', '#FD665F'],
                },
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: dimension2,
                        // Map the "product" column to Y axis
                        y: dimension3,
                    },
                },
            ],
        };
        option && myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
