import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../../utils/getUniqueId';
interface gradeGaugeType {
    Grades: string[];
    data: { value: number; name: string; title?: any; detail?: any }[];
}
const uniqueId = getUniqueId();
export default function GradeGauge({ Grades, data }: gradeGaugeType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        const colors = ['#FF6E76', '#FDDD60', '#58D9F9', '#7CFFB2', 'orange', 'purple'];
        const gradeLen=Grades.length
        const splitNumber=gradeLen*2
        function getColor() {
            const color: any[] = [];
            let start = 1 / (gradeLen);
            for (let i = 0; i < gradeLen; i++) {
                color.push([start, colors[i]]);
                start = 1 / (gradeLen) + start;
            }
            return color;
        }
        // debugger
        const color = getColor();
        function correctData() {
            if (data.length == 1) {
                // 重新排列数据
                let start = -33;
                for (let item of data) {
                    item.title = {
                        offsetCenter: [0, '20%'],
                    };
                    item.detail = {
                        offsetCenter: [0, '10%'],
                    };
                    start = -1 * start;
                }
            }
            if (data.length == 2) {
                // 重新排列数据
                let start = -33;
                for (let item of data) {
                    item.title = {
                        offsetCenter: [`${start}%`, '20%'],
                    };
                    item.detail = {
                        offsetCenter: [`${start}%`, '10%'],
                    };
                    start = -1 * start;
                }
            }
            if (data.length == 3) {
                // 重新排列数据
                let start = -50;
                for (let item of data) {
                    item.title = {
                        offsetCenter: [`${start}%`, '20%'],
                    };
                    item.detail = {
                        offsetCenter: [`${start}%`, '10%'],
                    };
                    start = start + 50;
                }
            }
        }
        correctData();
        // debugger
        option = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    center: ['50%', '75%'],
                    radius: '90%',
                    min: 0,
                    max: 1,
                    splitNumber,
                    axisLine: {
                        lineStyle: {
                            width: 6,
                            color,
                        },
                    },
                    pointer: {
                        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                        length: '60%',
                        width: 10,
                        // offsetCenter: [0, '-60%'],
                        itemStyle: {
                            color: 'auto',
                        },
                    },
                    axisTick: {
                        length: 12,
                        lineStyle: {
                            color: 'auto',
                            width: 2,
                        },
                    },
                    splitLine: {
                        length: 20,
                        lineStyle: {
                            color: 'auto',
                            width: 5,
                        },
                    },
                    axisLabel: {
                        color: '#464646',
                        fontSize: 20,
                        distance: -60,
                        rotate: 'tangential',
                        formatter: function (value: number) {
                            // debugger
                            let start = 1 / splitNumber;
                            for (let i = 0; i < gradeLen; i++) {
                                if (Math.abs(value - start) < 0.000001) {
                                    return Grades[i];
                                }
                                start = start + 1 / (gradeLen);
                            }
                            return '';
                        },
                    },
                    title: {
                        offsetCenter: [0, '-10%'],
                        fontSize: 20,
                    },
                    detail: {
                        fontSize: 30,
                        offsetCenter: [0, '-35%'],
                        valueAnimation: true,
                        formatter: function (value: number) {
                            return Math.round(value * 100) + '';
                        },
                        color: 'inherit',
                    },
                    data,
                },
            ],
        };

        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 600 }}></div>;
}
