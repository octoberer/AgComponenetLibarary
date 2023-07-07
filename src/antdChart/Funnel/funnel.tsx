import { Funnel } from '@ant-design/plots';
import { dataType } from '../commomType';
interface FunnelType {
    data: dataType;
    xField: string;
    yField: string;
    compareField?: string;
    seriesField?: string;
    hasLegend?: boolean;
    conversionTag?: boolean;
    labelType?: 'percent' | 'content';
    shape?: 'funnel' | 'pyramid';
    dynamicHeight?: boolean;
    isTransposed?:boolean
}
export const AntdFunnel = ({
    data,
    xField,
    yField,
    compareField,
    seriesField,
    hasLegend,
    conversionTag,
    labelType,
    shape,
    dynamicHeight,
    isTransposed,
}: FunnelType) => {
    let config = {
        data: data,
        xField,
        yField,
        legend: hasLegend,
        conversionTag:conversionTag?{}:false,
        shape,
        dynamicHeight,
        compareField,
        seriesField,
        isTransposed
    };
    if (labelType == 'percent') {
        config = Object.assign(config, {
            label: {
                formatter: (datum) => {
                    return `${(datum['$$percentage$$'] * 100).toFixed(2)}%`;
                },
            },
        });
    }
    if (compareField) {
        config = Object.assign(config, {
            tooltip: {
                // fields: ['stage', 'number', 'company'],
                formatter: (v) => ({
                    name: `${v[compareField]}的${v[xField]}`,
                    value: v[yField],
                }),
            },
        });
    }
    return <Funnel {...config} />;
};
