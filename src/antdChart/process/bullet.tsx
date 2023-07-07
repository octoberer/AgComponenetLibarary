import { Bullet } from '@ant-design/plots';
interface AntdBulletType {
    data: {
        title: string;
        ranges: number[];
        measures: number[];
        target: number;
    }[];
    rangeField: string;
    measureField: string;
    targetField: string;
    xField: string;
    color?: {
        range?: string[];
        measure?: string;
        target?: string;
    };
}
export const AntdBullet = ({ data, rangeField, measureField, targetField, xField, color }: AntdBulletType) => {
    const config = {
        data,
        measureField,
        rangeField,
        targetField,
        xField,
        color,
        label: {
            measure: {
                position: 'middle',
                style: {
                    fill: '#fff',
                },
            },
        },
        xAxis: {
            line: null,
        },
        yAxis: false,
        // 自定义 legend
        legend: {
            custom: true,
            position: 'bottom',
            items: [
                {
                    value: '差',
                    name: '差',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#FFbcb8',
                            r: 5,
                        },
                    },
                },
                {
                    value: '良',
                    name: '良',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#FFe0b0',
                            r: 5,
                        },
                    },
                },
                {
                    value: '优',
                    name: '优',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#bfeec8',
                            r: 5,
                        },
                    },
                },
                {
                    value: '实际值',
                    name: '实际值',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#5B8FF9',
                            r: 5,
                        },
                    },
                },
                {
                    value: '目标值',
                    name: '目标值',
                    marker: {
                        symbol: 'line',
                        style: {
                            stroke: '#39a3f4',
                            r: 5,
                        },
                    },
                },
            ],
        },
    };
    return <Bullet {...config} />;
};
