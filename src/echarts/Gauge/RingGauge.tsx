import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../../utils/getUniqueId';
interface RingGaugeType {
    RingGaugeData: { value: number; name: string; title?: any; detail?: any }[] ;
}
const uniqueId = getUniqueId();
export default function RingGauge({ RingGaugeData }: RingGaugeType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        function correctData() {
            if(RingGaugeData.length==1){
                RingGaugeData[0].title = {
                    offsetCenter: [`0%`, '30%'],
                };
                RingGaugeData[0].detail = {
                    offsetCenter: [`0%`, '10%'],
                };
            }
            if (RingGaugeData.length == 2) {
                // 重新排列数据
                let y = -33;
                for (let item of RingGaugeData) {
                    item.title = {
                        offsetCenter: [`${0}%`,`${y}%`],
                    };
                    item.detail = {
                        offsetCenter: [`${0}%`, `${y+10}%`],
                    };
                    y = -1 * y;
                }
            }
            if (RingGaugeData.length == 3) {
                // 重新排列数据
                let y = -30;
                for (let item of RingGaugeData) {
                    item.title = {
                        offsetCenter: [`0%`, `${y}%`],
                    };
                    item.detail = {
                        offsetCenter: [`0`,`${y+10}%`],
                    };
                    y = y + 30;
                }
            }
            if (RingGaugeData.length == 4) {
                // 重新排列数据
                let x =-30;
                let y=-30;
                let index=0
                for (let item of RingGaugeData) {
                    item.title = {
                        offsetCenter: [`${x}%`, `${y}%`],
                    };
                    item.detail = {
                        offsetCenter: [`${x}%`,`${y+10}%`],
                    };
                    index%2==0?x = x *-1:y=y*-1
                    index++
                }
            }
        }
        correctData();
        option = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    pointer: {
                        show: false,
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#464646',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            width: 40,
                        },
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
                        length: 10,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                        distance: 50,
                    },
                    data: RingGaugeData,
                    title: {
                        fontSize: 14,
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: 'inherit',
                        borderColor: 'inherit',
                        borderRadius: 20,
                        borderWidth: 1,
                        formatter: '{value}%',
                    },
                },
            ],
        };

        myChart.setOption(option);
    }, [RingGaugeData]);
    return <div id={uniqueId} style={{ width: 800, height: 600 }}></div>;
}
