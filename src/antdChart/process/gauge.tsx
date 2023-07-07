import { Gauge, G2 } from '@ant-design/plots';
import { percent } from '../../commonType';

interface DemoGaugeType {
    range?: {
        ticks?: number[];
        color?: string[] | string;
        width?: number;
    };
    indicatorType?: 'common' | 'clock' | 'clockwithcircle' | 'triangle';
    percent: percent;
    axis?: {
        label?: {
            formatter: (v: any) => number;
        };
        subTickLine?: {
            count: number;
        };
    };
    statistic?: {
        title?: string|string[];
        content?: string;
    };
    meter?: boolean,
}
export const AntdGauge = ({ percent, range, indicatorType, statistic,meter }: DemoGaugeType) => {
    let config = {
        percent,
        range,
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        type:meter?'meter':null
    };
    if (indicatorType) {
        let indicator = solveIndicator(indicatorType);
        config = Object.assign(config, { indicator });
    }
    if (statistic) {
        const {content,title}=statistic
        if(typeof title==='string')
        config = Object.assign(config, {
            statistic: {
                title: {
                    offsetY: -36,
                    style: {
                        fontSize: '36px',
                        color: '#4B535E',
                    },
                    formatter: () => title,
                },
                content: {
                    style: {
                        fontSize: '24px',
                        lineHeight: '44px',
                        color: '#4B535E',
                    },
                    formatter: () => content,
                },
            },
        });
        else if(Array.isArray(title)){
            const levels=title
            const colors = ['#FFbcb8', '#FFe0b0', '#bfeec8','#5B8FF9','#4F2F4F'];
            let rangecolor=''
            for (let i = 0; i < levels.length; i++) {
                rangecolor=rangecolor+` ${(1 / (levels.length-1)) *i}:${colors[i]}`
            }
            rangecolor='l(0)'+rangecolor
            config = Object.assign(config, {
                range: {
                    ticks: [0, 1],
                    color: [rangecolor],
                },
                statistic: {
                    title: {
                        formatter: ({ percent }) => {
                            for (let i = 1; i <= levels.length; i++) {
                                if (percent < (1 / levels.length) * i) {
                                    return levels[i - 1];
                                }
                            }
                        },
                        style: ({ percent }) => {
                            let color;
                            for (let i = 1; i <= levels.length; i++) {
                                if (percent < (1 / levels.length) * i) {
                                    color = colors[i- 1];
                                    break
                                }
                            }
                            return {
                                fontSize: '36px',
                                lineHeight: 1,
                                color,
                            };
                        },
                    },
                    content: {
                        offsetY: 36,
                        style: {
                            fontSize: '24px',
                            color: '#4B535E',
                        },
                        formatter: () => content,
                    },
                },
            });
        }
    }
    console.log(config)
    return <Gauge {...config} />;
};
const solveIndicator = (indicatorType: string | undefined) => {
    let indicator;
    const { registerShape, Util } = G2; // 自定义 Shape 部分

    if (indicatorType === 'common') {
        indicator = {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        };
    } else if (indicatorType === 'clock') {
        registerShape('point', 'clock', {
            draw(cfg, container) {
                // 使用 customInfo 传递参数
                const { indicator, defaultColor } = cfg.customInfo;
                const { pointer } = indicator;
                const group = container.addGroup(); // 获取极坐标系下画布中心点

                const center = this.parsePoint({
                    x: 0,
                    y: 0,
                }); // 绘制指针

                if (pointer) {
                    const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
                    const radius = this.coordinate.getRadius();
                    const midAngle = (startAngle + endAngle) / 2;
                    const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle + 1 / Math.PI);
                    const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle - 1 / Math.PI);
                    const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.65, midAngle);
                    const path = [['M', center.x, center.y], ['L', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']]; // pointer

                    group.addShape('path', {
                        name: 'pointer',
                        attrs: {
                            path,
                            fill: defaultColor,
                            ...pointer.style,
                        },
                    });
                }

                return group;
            },
        });
        indicator = {
            shape: 'clock',
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                    lineWidth: 1,
                    fill: '#D0D0D0',
                },
            },
        };
    } else if (indicatorType === 'clockwithcircle') {
        registerShape('point', 'custom-gauge-indicator2', {
            draw(cfg, container) {
                // 使用 customInfo 传递参数
                const { indicator, defaultColor } = cfg.customInfo;
                const { pointer, pin } = indicator;
                const group = container.addGroup(); // 获取极坐标系下画布中心点

                const center = this.parsePoint({
                    x: 0,
                    y: 0,
                }); // 绘制指针

                if (pointer) {
                    const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
                    const radius = this.coordinate.getRadius();
                    const midAngle = (startAngle + endAngle) / 2;
                    const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle + 1 / Math.PI);
                    const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle - 1 / Math.PI);
                    const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.65, midAngle);
                    const { x: x0, y: y0 } = Util.polarToCartesian(center.x, center.y, radius * 0.1, midAngle + Math.PI);
                    const path = [['M', x0, y0], ['L', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']]; // pointer

                    group.addShape('path', {
                        name: 'pointer',
                        attrs: {
                            path,
                            fill: defaultColor,
                            ...pointer.style,
                        },
                    });
                }

                if (pin) {
                    const pinStyle = pin.style || {};
                    const { lineWidth = 2, fill = defaultColor, stroke = defaultColor } = pinStyle;
                    const r = 6;
                    group.addShape('circle', {
                        name: 'pin-outer',
                        attrs: {
                            x: center.x,
                            y: center.y,
                            ...pin.style,
                            fill: 'transparent',
                            r: r * 1.5,
                            lineWidth,
                            stroke: stroke,
                        },
                    });
                    group.addShape('circle', {
                        name: 'pin-inner',
                        attrs: {
                            x: center.x,
                            y: center.y,
                            r,
                            stroke: 'transparent',
                            fill,
                        },
                    });
                }

                return group;
            },
        });
        indicator = {
            shape: 'custom-gauge-indicator2',
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                    lineWidth: 1,
                    fill: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    lineWidth: 2,
                    stroke: '#D0D0D0',
                    fill: '#D0D0D0',
                },
            },
        };
    } else if (indicatorType === 'triangle') {
        registerShape('point', 'triangle-gauge-indicator', {
            draw(cfg, container) {
                // 使用 customInfo 传递参数
                const { indicator, defaultColor } = cfg.customInfo;
                const { pointer } = indicator;
                const group = container.addGroup(); // 获取极坐标系下画布中心点

                const center = this.parsePoint({
                    x: 0,
                    y: 0,
                }); // 绘制指针

                if (pointer) {
                    const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
                    const radius = this.coordinate.getRadius();
                    const midAngle = (startAngle + endAngle) / 2;
                    const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius * 0.52, midAngle + Math.PI / 30);
                    const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius * 0.52, midAngle - Math.PI / 30);
                    const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.6, midAngle);
                    const path = [['M', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']]; // pointer

                    group.addShape('path', {
                        name: 'pointer',
                        attrs: {
                            path,
                            fill: defaultColor,
                            ...pointer.style,
                        },
                    });
                }

                return group;
            },
        });
        indicator = {
            shape: 'triangle-gauge-indicator',
            pointer: {
                style: {
                    fill: '#30BF78',
                },
            },
        };
    }
    return indicator;
};
