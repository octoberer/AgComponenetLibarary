import { RadialTreeGraph } from '@ant-design/charts';

export interface RadialTreeGraphType {
    /**
     * 典型的树状结构数据
     */
    data: {
        id: string;
        chilren?: RadialTreeGraphType[];
        value: string;
    };
    type?: 'icon-node' | 'card' | 'circle' | 'rect' | 'ellipse' | 'diamond' | 'triangle' | 'image' | 'modelRect' | 'donut';
    size?: number;
    themeColor?: string;
    edgeType?: 'line' | 'polyline' | 'arc' | 'quadratic' | 'cubic' | 'cubic-vertical' | 'cubic-horizontal' | 'loop';
}
export const AntdRadialTreeGraph = ({ data, type, size = 30, themeColor='green',edgeType='line' }: RadialTreeGraphType) => {
    const config = {
        data,
        nodeCfg: {
            type,
            size,
            label: {
                style: {
                    fill: '#fff',
                },
            },
            style: {
                fill: themeColor,
                stroke: '#0E1155',
                lineWidth: 2,
                strokeOpacity: 0.45,
            },
            nodeStateStyles: {
                hover: {
                    stroke: themeColor,
                    lineWidth: 2,
                    strokeOpacity: 1,
                },
            },
        },
        edgeCfg: {
            type: edgeType,
            style: {
                stroke: themeColor,
            },
            endArrow: {
                type: 'triangle',
                fill: themeColor,
                d: 15,
                size: 8,
            },
            edgeStateStyles: {
                hover: {
                    stroke: themeColor,
                    lineWidth: 2,
                },
            },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    };

    return <RadialTreeGraph {...config} />;
};
