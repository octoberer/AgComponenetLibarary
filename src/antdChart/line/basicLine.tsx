import { G2, Line } from '@ant-design/plots';
type percent = string;
type degree = number;
interface ComponentAnimateOption {
    appear?: ComponentAnimateCfg; // 图表第一次加载时的入场动画
    enter?: ComponentAnimateCfg; // 图表绘制完成，发生更新后，产生的新图形的进场动画
    update?: ComponentAnimateCfg; // 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画
    leave?: ComponentAnimateCfg; // 图表绘制完成，数据发生变更后，被销毁图形的销毁动画
  }
  
  interface ComponentAnimateCfg {
    animation?: string; // 动画效果，内置的动画效果见下表，也可以通过自定义动画的方式实现自定义效果
    duration?: number; // 动画执行时间
    easing?: string; // 动画缓动函数
    delay?: number; // 动画延迟时间
  }
interface lineType {
    /**
     *   横坐标显示的维度名字
     */
    xField: string;
    /**
     *   纵坐标显示的维度名字
     */
    yField: string;
    /**
     *   可选。系列维度。在设置salientPoint的同时，必须设置该键
     */
    seriesField?: string;
    /**
     *   表数据，是多个维度对象组成的数组
     */
    data: {
        [x: string]: string | number;
    }[];
    /**
     *   可选。xAxis的配置项
     */
    xAxis?: {
        nice?: boolean;
        // tickCount: 8,
        // 文本标签
        label?: {
            autoRotate?: boolean;
            offset?: number;
            style?: {
                [x: string]: string | number;
            };
            formatter?: (name: string) => string;
        };
        title?: {
            text?: string;
            style?: {
                fontSize: number;
            };
        };
        tickLine?: {
            style?: {
                lineWidth: number;
                stroke: string;
            };
            length?: number;
        };
        tickCount?: number;
    };
     /**
     *   可选。yAxis的配置项
     */
    yAxis?: {
        max?: number;
        // 文本标签
        label?: {
            autoRotate?: false;
            style?: {
                fill: string;
                fontSize: number;
            };
            formatter?: (name: string) => string;
        };
        title?: {
            text: string;
            style?: {
                fontSize: number;
            };
        };
        tickLine?: {
            style?: {
                lineWidth: number;
                stroke: '#aaa';
            };
            length: number;
        };
    };
     /**
     *   可选。所有point的配置都在这设置
     */
    point?: {
        size?: number;
        shape?:string| ((item: any) => string);
        style?:{
            lineWidth: 1,
            fillOpacity: 1,
        }| ((item: any) => {[x:string]:any})
    };
     /**
     *   可选。添加标注线，标注区域，文本等，通过start,end两个百分比坐标来实现
     */
    annotations?: (
        | {
              type: 'line';
              start: [percent, percent];
              end: [percent, percent];
              style?: {
                  stroke?: string;
                  lineWidth?: number;
                  lineDash?: [number, number];
              };
          }
        | {
              type: 'region';
              start: [percent, percent];
              end: [percent, percent];
              style?: {
                  fill: string;
                  fillOpacity: number;
                  opacity: number;
              };
          }
        | {
              type: 'text';
              position: [percent, percent];
              content: string;
              style?: {
                  fill: string;
                  fontSize: number;
                  textAlign: 'center' | 'left';
              };
          }
    )[];
    /**
     *   可选。设置线是否平滑
     */
    smooth?: boolean;
    /**
     *   可选。设置每个点的形状，默认circle
     */
    pointshape?:
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
    /**
     *   可选。设置是否呈现鼠标移到某个系列的强调效果（改变线条颜色）
     */
    activeEmphasize?: boolean;
    /**
     *   可选。设置横坐标数据的缩放条，可以直接传入布尔值，也可以自定义数据缩放的开始和结尾
     */
    slider?:
        | boolean
        | {
              start: percent;
              end: percent;
          };
    /**
     *   可选。突出点。name是注册点用的名字；condition是一个维度及其需要强调点的维度值所组成的长度为2的数组，可设置多个condition
     */
    salientPoint?: { name: string; conditions: [string, any][] };
    /**
     *   可选。设置中位线区分效果,这个不能和slider同时存在，绘制会出现问题
     */
    medianFlag?: boolean;
    /**
     *   可选。设置动画类型和持续时长。type有'fade-in','fade-out','grow-in-x','grow-in-y','grow-in-xy','scale-in-x','scale-in-y','wave-in','zoom-in','zoom-out','path-in'
     */
    animation?:false|ComponentAnimateOption,
    /**
     *   可选。通过回调实现不同系列不同的linestyle，其传参是数据项，可通过判断某个数据维度来实现
     */
    lineStyle?: (dataobj:{[x:string]:any}) => {[x:string]:any},
    /**
     *   可选。是否开启阶段折线图
     */
    stepType?: 'vh',
    legend?:boolean
}
const registerPoint = (name: string, conditions: [string, string][]) => {
    console.log(name, conditions);
    debugger;
    G2.registerShape('point', 'test', {
        draw(cfg, container) {
            const data = cfg.data as G2.Types.Datum;
            const point = {
                x: cfg.x,
                y: cfg.y,
            };
            const group = container.addGroup();
            debugger;
            const flag = conditions.every((condition) => {
                return data[condition[0]] === condition[1];
            });
            if (flag) {
                debugger;
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
export const DemoLine = ({
    data,
    xField,
    yField,
    seriesField,
    xAxis,
    yAxis = {},
    pointshape,
    smooth,
    activeEmphasize,
    slider,
    salientPoint,
    medianFlag = false,
    point,
    annotations,
    animation=false,
    lineStyle ,
    stepType,
    legend=true
}: lineType) => {
    console.log('yField', yField);
    let config = {
        autoFit: true,
        data,
        padding: 'auto',
        xField,
        yField,
        xAxis,
        yAxis,
        seriesField,
        smooth,
        annotations,
        animation,
        lineStyle,
        stepType,
        legend
    };
    if (pointshape) {
        config = Object.assign(config, {
            point: {
                size: 2,
                shape: pointshape,
                style: {
                    fill: 'white',
                    stroke: '#5B8FF9',
                    lineWidth: 2,
                },
            },
        });
    }
    else if(point){
        config = Object.assign(config,{point})
    }
    console.log('config',config)
    if (activeEmphasize) {
        config = Object.assign(config, {
            state: {
                active: {
                    style: {
                        shadowBlur: 4,
                        stroke: 'green',
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
    } else if (slider) {
        config = Object.assign(config, { slider: {} });
    }
    if (salientPoint != undefined) {
        console.log('salientPoint', salientPoint);
        debugger;
        registerPoint(salientPoint.name, salientPoint.conditions);
        config = Object.assign(config, {
            point: {
                shape: 'test',
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
