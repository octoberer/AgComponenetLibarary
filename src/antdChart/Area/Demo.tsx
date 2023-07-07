import { Area } from '@ant-design/plots';
type percent = string;
type annotationsposition = percent | 'min' | 'median' | 'max';
interface AreaType {
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
        range?: [percent, percent];
        tickCount?: number;
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
    };
    /**
     *   可选。yAxis的配置项
     */
    yAxis?: {
        label?: {
            autoRotate?: false;
            style?: {
                fill: string;
                fontSize: number;
            };
            formatter?: (value: any) => any;
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
        max?: number;
    };
    slider?:
        | true
        | {
              start?: percent;
              end?: percent;
              trendCfg?: {
                  isArea: true;
              };
          };
    /**
     *   可选。添加标注线，标注区域，文本等，通过start,end两个百分比坐标来实现
     */
    annotations?: (
        | {
              type: 'line';
              start: [annotationsposition, annotationsposition];
              end: [annotationsposition, annotationsposition];
              style?: {
                  stroke?: string;
                  lineWidth?: number;
                  lineDash?: [number, number];
              };
          }
        | {
              type: 'region';
              start: [annotationsposition, annotationsposition];
              end: [annotationsposition, annotationsposition];
              style?: {
                  fill: string;
                  fillOpacity: number;
                  opacity: number;
              };
          }
        | {
              type: 'text';
              position: [annotationsposition, annotationsposition];
              content: string;
              style?: {
                  fill?: string;
                  fontSize?: number;
                  textAlign?: 'center' | 'left';
                  textBaseline?: string;
              };
              offsetY?: number;
          }
    )[];
    isPercent?: boolean;

    pattern?: {
        type?: 'line' | 'dot' | 'square';
        cfg?: {
            size?: number;
            padding?: number;
            rotation?: number;
            fill?: string;
            isStagger?: boolean;
        };
    };
}
export const DemoArea = ({
    data,
    pattern,
    xField,
    yField,
    seriesField,
    xAxis = {},
    yAxis = {},
    slider,
    isPercent,
    annotations,
}: AreaType) => {
    if (typeof slider == 'boolean') {
        slider = {};
    }
    const config = {
        data,
        xField,
        yField,
        seriesField,
        xAxis,
        yAxis,
        pattern,
        slider,
        isPercent,
        annotations,
    };

    return <Area {...config} />;
};
