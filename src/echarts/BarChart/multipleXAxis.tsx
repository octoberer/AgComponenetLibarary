import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
import * as echarts from 'echarts';

interface MultipleXAxisType {
    options: { sourceData: any[][] };
}
const uniqueId = getUniqueId();
export default function MultipleXAxis({ options }: MultipleXAxisType) {
    const { sourceData } = options;
    useEffect(() => {
        // debugger
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        // debugger;
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
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
        };
        option && myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
