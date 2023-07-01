import { useEffect } from 'react';
import * as echarts from 'echarts';
import { getUniqueId } from '../utils/getUniqueId';
import React from 'react';
type percent = string | number;
interface RadarData {
    name: string;
    value: number[];
}
interface singleseriesType {
    type?: 'radar';
    radarIndex?: number;
    areaStyle?: boolean;
    data: RadarData[];
}
type indicatorType = { text: string; max: number }[];
interface BasicRadarChartType {
    options: { radar: { shape?: 'circle'; indicator: indicatorType; center: percent[]; radius: number }[]; series: singleseriesType[] };
}
const uniqueId = getUniqueId();
export default function BasicRadarChart({ options }: BasicRadarChartType) {
    const { radar, series } = options;
    useEffect(() => {
        let chartDom = document.getElementById(uniqueId) as HTMLElement;
        let myChart = echarts.init(chartDom);
        let option: echarts.EChartsCoreOption;
        option = {
            title: {
                text: 'Basic Radar Chart',
            },
            legend: {},
            radar,
            series,
        };

        myChart.setOption(option);
    }, []);
    return <div id={uniqueId} style={{ width: 800, height: 500 }}></div>;
}
