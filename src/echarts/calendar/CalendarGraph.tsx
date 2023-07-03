import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../../utils/getUniqueId';
interface CalendarGraphType {
    startDate: string;
    endDate: string;
    CalendarGraphdata: [string, number][];
    Calendardata: { [x: string]: number };
}
const uniqueId = getUniqueId();
export default function CalendarGraph({ CalendarGraphdata, Calendardata, endDate, startDate }: CalendarGraphType) {
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;

        const graphData: [string, number][] = CalendarGraphdata;

        const links = graphData.map(function (item, idx) {
            return {
                source: idx,
                target: idx + 1,
            };
        });
        links.pop();

        function getVirtualData() {
            let min = Infinity,
                max = -Infinity;
            const date = +echarts.time.parse(startDate);
            const end = +echarts.time.parse(endDate);
            const dayTime = 3600 * 24 * 1000;
            const data: [string, number][] = [];
            for (let time = date; time < end; time += dayTime) {
                let temp = echarts.time.format(time, '{yyyy}-{MM}-{dd}', false) as string;
                if (Math.floor(Calendardata[temp]) < min) {
                    min = Math.floor(Calendardata[temp]);
                }
                if (Math.floor(Calendardata[temp]) > max) {
                    max = Math.floor(Calendardata[temp]);
                }
                data.push([temp, Calendardata[temp]]);
            }
            min = Math.floor(min / 100) * 100;
            max = Math.ceil(max / 100) * 100;
            return { data, min, max };
        }
        const { data, min, max } = getVirtualData();
        const startYear = startDate.split('_')[0];
        const endYear = endDate.split('_')[0];
        const range = [startYear, endYear];
        option = {
            tooltip: {},
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: 40,
                yearLabel: {
                    margin: 50,
                    fontSize: 30,
                },
                dayLabel: {
                    firstDay: 1,
                    nameMap: 'cn',
                },
                monthLabel: {
                    nameMap: 'cn',
                    margin: 15,
                    fontSize: 20,
                    color: '#999',
                },
                range,
            },
            visualMap: {
                min,
                max,
                type: 'piecewise',
                left: 'center',
                bottom: 20,
                inRange: {
                    color: ['#5291FF', '#C7DBFF'],
                },
                seriesIndex: [1],
                orient: 'horizontal',
            },
            series: [
                {
                    type: 'graph',
                    edgeSymbol: ['none', 'arrow'],
                    coordinateSystem: 'calendar',
                    links: links,
                    symbolSize: 15,
                    calendarIndex: 0,
                    itemStyle: {
                        color: 'yellow',
                        shadowBlur: 9,
                        shadowOffsetX: 1.5,
                        shadowOffsetY: 3,
                        shadowColor: '#555',
                    },
                    lineStyle: {
                        color: '#D10E00',
                        width: 1,
                        opacity: 1,
                    },
                    data: graphData,
                    z: 20,
                },
                {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data,
                },
            ],
        };

        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 600 }}></div>;
}
