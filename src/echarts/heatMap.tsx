import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../utils/getUniqueId';

type x=number
type y=number
interface heatMapChartType {
    heatMapData: [x,y,number][],yAxisData:string[];xAxisData:string[] ,title?:any;
}
const uniqueId = getUniqueId();
export default function HeatMapChart({  heatMapData,yAxisData,xAxisData,title }: heatMapChartType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        const data = heatMapData.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
        });
        option = {
            title,
            tooltip: {
                position: 'top',
            },
            grid: {
                height: '50%',
                top: '10%',
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                splitArea: {
                    show: true,
                },
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                splitArea: {
                    show: true,
                },
            },
            visualMap: {
                min: 0,
                max: 10,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%',
            },
            series: [
                {
                    name: 'Punch Card',
                    type: 'heatmap',
                    data: data,
                    label: {
                        show: true,
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
