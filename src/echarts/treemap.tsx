import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../utils/getUniqueId';
export interface TreeMapChartDataType {
    name: string;
    value: number;
    children?: TreeMapChartDataType[];
}
interface TreeMapChartType {
    data: TreeMapChartDataType[];
}
const uniqueId = getUniqueId();
export default function TreeMapChart({ data }: TreeMapChartType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        // debugger
        option = {
            series: [
                {
                    type: 'treemap',
                    data,
                },
            ],
        };
        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
