import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../../utils/getUniqueId';
interface basicCalendarType {
    options: { startDate: string; endDate: string; Calendardata: { [x: string]: number }; coordinateType: 'heatMap' | 'scatter' };
}
const uniqueId = getUniqueId();
export default function BasicCalendar({ options }: basicCalendarType) {
    const { Calendardata, endDate, startDate, coordinateType } = options;
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;

        function getVirtualData() {
            let min = Infinity,
                max = -Infinity;
            const date = +echarts.time.parse(startDate);
            const end = +echarts.time.parse(endDate);
            const dayTime = 3600 * 24 * 1000;
            const data: [string, number][] = [];
            for (let time = date; time < end; time += dayTime) {
                let temp = echarts.time.format(time, '{yyyy}-{MM}-{dd}', false);
                if (Math.floor(Calendardata[temp]) < min) {
                    min = Math.floor(Calendardata[temp]);
                }
                if (Math.floor(Calendardata[temp]) > max) {
                    max = Math.floor(Calendardata[temp]);
                }
                data.push([temp, Math.floor(Calendardata[temp])]);
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
            title: {
                top: 30,
                left: 'center',
                text: 'Daily Step Count',
            },
            tooltip: {},
            calendar: [
                {
                    top: 120,
                    left: 30,
                    right: 30,
                    // cellSize: 40,
                    range,
                    itemStyle: {
                        borderWidth: 0.5,
                    },
                    yearLabel: { show: false },
                },
            ],
            series: {
                type: coordinateType,
                coordinateSystem: 'calendar',
                data,
                symbolSize: function (val) {
                    return (val[1] / min) * 10;
                },
            },
            visualMap: {
                min,
                max,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65,
                calculable: true,
            },
        };

        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
