import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
import * as echarts from 'echarts';

interface ShareDatasetType {
    options: { DataSet:{[x: string]: any} };
}
const uniqueId = getUniqueId();
export default function ShareDatasetChart({ options }: ShareDatasetType) {
    const { DataSet} = options;
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false,
            },
            dataset: {
                source: DataSet,
            },
            xAxis: { type: 'category' },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%' },
            series: [...DataSet.slice(1).map
                (item=>({
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' },
                })),
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    emphasis: {
                        focus: 'self',
                    },
                    label: {
                        formatter: '{b}: {@'+DataSet[0][1]+'} ({d}%)',
                    },
                    encode: {
                        itemName: DataSet[0][0],
                        value: DataSet[0][1],
                        tooltip: DataSet[0][1],
                    },
                },
            ],
        };
        myChart.on('updateAxisPointer', function (event) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                const dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)',
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension,
                        },
                    },
                });
            }
        });
        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
