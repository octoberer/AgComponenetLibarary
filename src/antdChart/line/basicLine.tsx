import { G2, Line } from '@ant-design/plots';
type percent = number;
interface lineType {
    xField: string;
    yField: string;
    data: {
        [x: string]: string|number;
    }[];
    /**
     *   期望的坐标轴刻度数量，非最终结果。
     */
    tickCount: number;
    smooth?: boolean;
    pointshape:
        | 'circle'
        | 'square'
        | 'line'
        | 'diamond'
        | 'triangle'
        | 'triangle-down'
        | 'hexagon'
        | 'bowtie'
        | 'cross'
        | 'tick'
        | 'plus'
        | 'hyphen';
    activeEmphasize?: boolean;
    slider?:
        | boolean
        | {
              start: percent;
              end: percent;
          };
    salientPoint?: { name: string; conditions: [string, any][] };
    medianFlag?:boolean
}
const registerPoint = ({ name, conditions }: { name: string; conditions: [string, string][] }) => {
    G2.registerShape('point', name, {
        draw(cfg, container) {
            const data = cfg.data as G2.Types.Datum;
            const point = {
                x: cfg.x,
                y: cfg.y,
            };
            const group = container.addGroup();
            const flag = conditions.every((condition) => {
                return data[condition[0]] === condition[1];
            });
            if (flag) {
                const decorator1 = group.addShape('circle', {
                    attrs: {
                        x: point.x,
                        y: point.y,
                        r: 10,
                        fill: cfg.color,
                        opacity: 0.5,
                    },
                });
                const decorator2 = group.addShape('circle', {
                    attrs: {
                        x: point.x,
                        y: point.y,
                        r: 10,
                        fill: cfg.color,
                        opacity: 0.5,
                    },
                });
                const decorator3 = group.addShape('circle', {
                    attrs: {
                        x: point.x,
                        y: point.y,
                        r: 10,
                        fill: cfg.color,
                        opacity: 0.5,
                    },
                });
                decorator1.animate(
                    {
                        r: 20,
                        opacity: 0,
                    },
                    {
                        duration: 1800,
                        easing: 'easeLinear',
                        repeat: true,
                    }
                );
                decorator2.animate(
                    {
                        r: 20,
                        opacity: 0,
                    },
                    {
                        duration: 1800,
                        easing: 'easeLinear',
                        repeat: true,
                        delay: 600,
                    }
                );
                decorator3.animate(
                    {
                        r: 20,
                        opacity: 0,
                    },
                    {
                        duration: 1800,
                        easing: 'easeLinear',
                        repeat: true,
                        delay: 1200,
                    }
                );
                group.addShape('circle', {
                    attrs: {
                        x: point.x,
                        y: point.y,
                        r: 6,
                        fill: cfg.color,
                        opacity: 0.7,
                    },
                });
                group.addShape('circle', {
                    attrs: {
                        x: point.x,
                        y: point.y,
                        r: 1.5,
                        fill: cfg.color,
                    },
                });
            }

            return group;
        },
    });
};
export const DemoLine = ({ data, xField, yField, tickCount,pointshape, smooth, activeEmphasize, slider, salientPoint,medianFlag=false }: lineType) => {
    let config = {
        data,
        padding: 'auto',
        xField,
        yField,
        xAxis: {
            tickCount,
        },
        slider: {
            start: 0.1,
            end: 0.5,
        },
        smooth,
        point: {
            size: 5,
            shape: pointshape,
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
    };
    if (activeEmphasize) {
        config = Object.assign(config, {
            state: {
                active: {
                    style: {
                        shadowBlur: 4,
                        stroke: '#000',
                        // fill: '#5B8FF9',
                    },
                },
            },
            interactions: [
                {
                    type: 'element-active',
                },
            ],
        });
    }
    if (typeof slider === 'object') {
        config = Object.assign(config, slider);
    } else {
        config = Object.assign(config, { slider: {} });
    }
    if (salientPoint) {
        registerPoint(salientPoint);
        config = Object.assign(config, {
            point: {
                shape: salientPoint.name,
            },
        });
    }
    if (medianFlag) {
        const mediaibj = {
            annotations: [
                // 低于中位数颜色变化
                {
                    type: 'regionFilter',
                    start: ['min', 'median'],
                    end: ['max', '0'],
                    color: '#F4664A',
                },
                {
                    type: 'text',
                    position: ['min', 'median'],
                    content: '中位数',
                    offsetY: -4,
                    style: {
                        textBaseline: 'bottom',
                    },
                },
                {
                    type: 'line',
                    start: ['min', 'median'],
                    end: ['max', 'median'],
                    style: {
                        stroke: '#F4664A',
                        lineDash: [2, 0],
                    },
                },
            ],
        };
        config = Object.assign(config, mediaibj);
    }
    return <Line {...config} />;
};
