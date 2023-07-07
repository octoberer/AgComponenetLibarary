type legend =
    | boolean
    | {
          position?:
              | 'top'
              | 'top-left'
              | 'top-right'
              | 'left'
              | 'left-top'
              | 'left-bottom'
              | 'right'
              | 'right-top'
              | 'right-bottom'
              | 'bottom'
              | 'bottom-left'
              | 'bottom-right';
          layout?: 'horizontal' | 'vertical';
          title?: { text: string };
      };
type percent = number;
interface yAxis {
    label?: {
        autoRotate?: boolean;
        autoHide?: boolean;
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
}
interface xAxis {
    range?: [percent, percent];
    tickCount?: number;
    nice?: boolean;
    // tickCount: 8,
    // 文本标签
    label?: {
        autoRotate?: boolean;
        autoHide?: boolean;
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
}
interface label {
    // 用于pie的设置
    type?: 'inner' | 'outer' | 'spider';
    // 可手动配置 label 数据标签位置
    position?: 'top' | 'middle' | 'bottom';
    // 配置样式
    style?: {
        fill?: string;
        opacity?: percent;
        fontSize?: number;
        textAlign?: 'center' | 'left' | 'right';
    };
    labelHeight?: number;
    content?: ((Data: { [x: string]: string | number }, mappingData?: any) => string | undefined | any) | string;
}
type color = (Data: { [x: string]: string | number }) => string | string[];
type dataType = {
    [x: string]: string | number | [number, number];
}[];
export type { legend, yAxis, xAxis, label, color, dataType };
