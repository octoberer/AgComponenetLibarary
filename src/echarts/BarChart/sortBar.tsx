import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
import * as echarts from 'echarts';

interface SimpleEncodeType {
    dimensions: string[];
    sourceData: any[][];
    sortDimension: string;
    XDimension: string;
     /**
     * 表示y轴的维度
     */
    YDimension: string;
}

const uniqueId = getUniqueId();
export default function SortBar(props: SimpleEncodeType) {
    const { dimensions, sourceData, sortDimension, XDimension, YDimension } = props;
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        // debugger;
        option = {
            dataset: [
                {
                    dimensions,
                    source: sourceData,
                },
                {
                    transform: {
                        type: 'sort',
                        config: { dimension: sortDimension, order: 'desc' },
                    },
                },
            ],
            xAxis: {
                type: 'category',
                axisLabel: { interval: 0, rotate: 30 },
            },
            yAxis: {},
            series: {
                type: 'bar',
                encode: { x: XDimension, y: YDimension },
                datasetIndex: 1,
            },
        };
        option && myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
