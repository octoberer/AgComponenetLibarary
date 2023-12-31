import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
import * as echarts from 'echarts';

interface MultipleXAxisType {
    /**
     * 是个二维数组，第一列是横坐标的刻度值，剩余n列代表当前产品的n个种类（年份）的值
     */
    sourceData: any[][];
    stack?: boolean;
}
const uniqueId = getUniqueId();
export default function MultipleXAxis({ sourceData, stack }: MultipleXAxisType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        const series = [];
        for (let i = 0; i < sourceData[0].length - 1; i++) {
            if (stack) {
                series.push({
                    type: 'bar',
                    stack: 'total',
                });
            } else {
                series.push({
                    type: 'bar',
                });
            }
        }
        option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: sourceData,
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series,
        };
        option && myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
