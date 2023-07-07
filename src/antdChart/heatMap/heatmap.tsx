import { Heatmap } from '@ant-design/plots';
import { dataType, label } from '../commomType';

interface DemoHeatmapType {
    data: dataType;
    xField: string;
    yField: string;
    colorField: string;
    /**
     *   控制单元形状的大小随哪一个维度而变化
     */
    sizeField?: string;
    /**
     *   设置展示颜色的可选项
     */
    color?: string[];
    /**
     *   设置单元形状
     */
    shape?: 'rect' | 'square' | 'circle';
    /**
     *   设置单元形状大小，只有设置了shape才有效
     */
    sizeRatio?: number;
    hasLabel?: boolean;
}
export const AntdHeatmap = ({ data, xField, yField, colorField, color, shape, sizeRatio, hasLabel }: DemoHeatmapType) => {
    let config = {
        autoFit: true,
        data,
        xField,
        yField,
        colorField,
        color,
        meta: {
            [xField]: {
                type: 'cat',
            },
        },
        shape,
        sizeRatio,
    };
    if (hasLabel) {
        config = Object.assign(config, {
            label: {
                formatter: (data) => {
                    const a = data[colorField];
                    if (a != 'NULL') {
                        return a.toFixed(0);
                    }
                },
            },
        });
    }
    return <Heatmap {...config} />;
};
