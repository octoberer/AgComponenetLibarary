import { Card, Col, Row } from 'antd';
import styles from './App.module.css';
import SelfCard from './Card';
import SortBar from './echarts/BarChart/sortBar';
import {
    CalendarPieChartData,
    Calendardata,
    CalendargraphData,
    MultipleXAxisData,
    SortBardataset,
    basicPieData1,
    heatMapDataobj,
    radarChartData,
    shareDataSetData,
    treeMapData,
} from './data';
import MultipleXAxis from './echarts/BarChart/multipleXAxis';
import BasicPieChart from './echarts/pieChart/BasicChart';
import CalendarPieChart from './echarts/calendar/CalendarPieChart';
import ShareDatasetChart from './echarts/pieChart/ShareDataset';
import BasicRadarChart from './echarts/BasicRadarChart';
import HeatMapChart from './echarts/heatMap';
import TreeMapChart from './echarts/treemap';
import BasicCalendar from './echarts/calendar/basicCalendar';
import CalendarGraph from './echarts/calendar/CalendarGraph';
import GradeGauge from './echarts/Gauge/GradeGauge';
import TemperatureGaugechart from './echarts/Gauge/TemperatureGaugechart';
import RingGauge from './echarts/Gauge/RingGauge';
import { BarChart } from 'echarts/charts';
import BasicBarChart from './echarts/BarChart/basicBarChart';

const App: React.FC = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <Row gutter={16}>
                    <Col span={8}>
                        <SelfCard
                            params={{
                                title: '连通散点图',
                                description: '表示某些时间节点的两项变量的趋势',
                                componentSrc: '',
                            }}
                        ></SelfCard>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
            <SortBar
                    dimensions= {SortBardataset.dimensions}
                    sourceData={ SortBardataset.data}
                    sortDimension= 'score'
                    XDimension= 'name'
                    YDimension= 'score'
            ></SortBar>
            <MultipleXAxis
                    sourceData={MultipleXAxisData}
            ></MultipleXAxis>
            <BasicPieChart
                options={{
                    title: {
                        text: '我的饼图',
                    },

                    seriesdata: [
                        {
                            name: '饼图',
                            radius: '70%',
                            data: basicPieData1,
                            // half: true,
                            // roseType: true,
                            top: 0,
                            bottom: '66.6667%',
                            left: 0,
                            right: 0,
                        },
                        {
                            name: '饼图',
                            radius: ['40%', '70%'],
                            data: basicPieData1,
                            // half: true,
                            roseType: true,
                            left: 0,
                            right: 0,
                            top: '33.3333%',
                            bottom: '33.3333%',
                        },
                        {
                            name: '饼图',
                            radius: ['40%', '70%'],
                            data: basicPieData1,
                            // half: true,
                            roseType: true,
                            top: '66.6667%',
                            right: 0,
                            left: 0,
                            bottom: 0,
                        },
                    ],
                }}
            ></BasicPieChart>
            <CalendarPieChart
                    Datedata= {CalendarPieChartData}
            />
            <ShareDatasetChart
                options={{
                    DataSet: shareDataSetData,
                }}
            ></ShareDatasetChart>
            <BasicRadarChart
                options={{
                    radar: radarChartData.radar,
                    series: radarChartData.series,
                }}
            ></BasicRadarChart>
            <HeatMapChart options={heatMapDataobj}></HeatMapChart>
            <TreeMapChart
                options={{
                    data: treeMapData,
                }}
            ></TreeMapChart>
            <BasicCalendar
                    startDate='2022-2-1'
                    endDate= '2022-11-2'
                    Calendardata={Calendardata}
                    coordinateType='scatter'
            ></BasicCalendar>
            <CalendarGraph
                options={{
                    startDate: '2022-2-1',
                    endDate: '2022-3-20',
                    CalendarGraphdata: CalendargraphData,
                    Calendardata,
                }}
            ></CalendarGraph>
            <GradeGauge
                options={{
                    Grades: ['Grade A', 'Grade B', 'Grade C', 'Grade D'],
                    splitNumber: 8,
                    data: [
                        {
                            value: 0.7,
                            name: 'Grade Rating',
                        },
                        {
                            value: 0.1,
                            name: 'Grade 12',
                        },
                        {
                            value: 0.5,
                            name: 'xxxxx',
                        },
                    ],
                }}
            ></GradeGauge>
            <TemperatureGaugechart
                options={{
                    datavalue: 30,
                }}
            ></TemperatureGaugechart>
            <RingGauge
                options={{
                    RingGaugeData: [{ value: 20, name: 'Perfect' }],
                }}
            ></RingGauge>
            <BasicBarChart
                title={{
                    text: 'test',
                    left:'center'
                }}
                xAxisData={['2012', '2013', '2014', '2015', '2016']}
                seriesdata={[
                    {
                        name: 'Forest',
                        data: [320, 332, 301, 334, 390],
                    },
                    {
                        name: 'Steppe',
                        data: [220, 182, 191, 234, 290],
                    },
                    {
                        name: 'Desert',
                        data: [150, 232, 201, 154, 190],
                    },
                    {
                        name: 'Wetland',
                        data: [98, 77, 101, 99, 40],
                    },
                ]}
                markLine={true}
            ></BasicBarChart>
        </>
    );
};

export default App;
