import { useEffect } from 'react';
import { getUniqueId } from '../../utils/getUniqueId';
import * as echarts from 'echarts';

interface CalendarPieChartType {
    /**
     *     以日期为建，值为pie所需要的数组内容
     */
    Datedata:{[x: string]: any[]} 
}
const uniqueId = getUniqueId();
export default function CalendarPieChart({ Datedata }: CalendarPieChartType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        // debugger;
        const cellSize = [80, 80];
        const pieRadius = 30;
        function getVirtualData() {
            const date = +echarts.time.parse('2017-02-01');
            const end = +echarts.time.parse('2017-03-01');
            const dayTime = 3600 * 24 * 1000;
            const data = [];
            let abc: { [x: string]: any } = {};
            for (let time = date; time < end; time += dayTime) {
                let dateStr=echarts.time.format(time, '{yyyy}-{MM}-{dd}', false)
                data.push([dateStr,Datedata[dateStr]]);
            }
            localStorage.setItem('user', JSON.stringify(abc));
            console.log(abc, localStorage.getItem('user'));
            return data;
        }
        const scatterData = getVirtualData();
        const pieSeries = scatterData.map(function (item, index) {
            return {
                type: 'pie',
                id: 'pie-' + index,
                center: item[0],
                radius: pieRadius,
                coordinateSystem: 'calendar',
                label: {
                    formatter: '{c}',
                    position: 'inside',
                },
                data: item[1],
            };
        });
        option = {
            tooltip: {},
            legend: {
                data: ['Work', 'Entertainment', 'Sleep'],
                bottom: 20,
            },
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: cellSize,
                yearLabel: {
                    show: false,
                    fontSize: 30,
                },
                dayLabel: {
                    margin: 20,
                    firstDay: 1,
                    nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                monthLabel: {
                    show: false,
                },
                range: ['2017-02'],
            },
            series: [
                {
                    id: 'label',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    symbolSize: 0,
                    label: {
                        show: true,
                        formatter: function (params) {
                            return echarts.time.format(params.value[0], '{dd}', false);
                        },
                        offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                        fontSize: 14,
                    },
                    data: scatterData,
                },
                ...pieSeries,
            ],
        };
        option && myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
