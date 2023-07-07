import { Pie, measureTextWidth, G2 } from '@ant-design/plots';
import { dataType, label } from '../commomType';
import { percent } from '../../commonType';

interface DemoPietype {
    /**
     *   数据，是多个维度对象组成的数组
     */
    data: dataType;
    /**
     *   依照该维度进行分饼
     */
    angleField: string;
    /**
     *   依照该维度进行颜色区分
     */
    colorField: string;
    /**
     *   定义饼的半径，如0.8，其意思是pie的实际大小只占了本来的80%
     */
    radius?: percent;
    /**
     *   定义饼的内半径，如0.3
     */
    innerRadius?: percent;
    /**
     *   定义饼的文字标识的位置和内容
     */
    label?: label;
    /**
     *   是否丰富label内容
     */
    richlabel?: boolean;
    /**
     *   设置圆弧起始角度
     */
    startAngle?: number;
    /**
     *   设置圆弧结束角度
     */
    endAngle?: number;
    /**
     *   设置每一份饼的样式，包括分割线样式，填充颜色等
     */
    pieStyle?: {
        lineWidth?: number;
        stroke?: string;
        fillOpacity?: percent;
        lineDash?: [number, number];
    };
    /**
     *   给每份饼自定义图片背景
     */
    pieBackPic?: string[];
    /**
     *   在设置了innerRadius的前提下，这个参数才有效.可通过传入一个字符串直接设置内部标题；也可通过传入对象设置title,和当前value所对应的 unit
     */
    innerContent?: string | { unit?: string };
}
export const DemoPie = ({
    data,
    angleField,
    colorField,
    radius,
    innerRadius,
    label = {},
    startAngle,
    endAngle,
    pieStyle,
    pieBackPic,
    innerContent,
    richlabel,
}: DemoPietype) => {
    let config = {
        data,
        angleField,
        colorField,
        radius,
        innerRadius,
        startAngle,
        endAngle,
        pieStyle,
        label: {
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
            ...label,
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
        richlabel,
    };
    if (pieBackPic) {
        config = Object.assign(config, {
            pieStyle: (itemdata: { [x: string]: any }) => {
                const index = data.findIndex((item) => item[colorField] === itemdata[colorField]);
                return {
                    fill: `p(a)${pieBackPic[index]}`,
                };
            },
        });
    }
    solveinnerContent(config, innerContent);
    if (richlabel) {
        const G = G2.getEngine('canvas');
        config = Object.assign(config, {
            label: {
                type: 'spider',
                labelHeight: 40,
                formatter: (data, mappingData) => {
                    const group = new G.Group({});
                    group.addShape({
                        type: 'circle',
                        attrs: {
                            x: 0,
                            y: 0,
                            width: 40,
                            height: 50,
                            r: 5,
                            fill: mappingData.color,
                        },
                    });
                    group.addShape({
                        type: 'text',
                        attrs: {
                            x: 10,
                            y: 8,
                            text: `${data.type}`,
                            fill: mappingData.color,
                        },
                    });
                    group.addShape({
                        type: 'text',
                        attrs: {
                            x: 0,
                            y: 25,
                            text: `${data.value}个 ${data.percent * 100}%`,
                            fill: 'rgba(0, 0, 0, 0.65)',
                            fontWeight: 700,
                        },
                    });
                    return group;
                },
            },
        });
    }
    return <Pie {...config} />;
};
function renderStatistic(containerWidth: number, text: string, style: { fontSize: number }) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
        scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}
const solveinnerContent = (config: any, innerContent?: string | { unit?: string | undefined }) => {
    if (typeof innerContent === 'undefined') {
        return;
    }
    if (typeof innerContent === 'string') {
        config = Object.assign(config, {
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    },
                    content: innerContent,
                },
            },
        });
    } else {
        let {unit}=innerContent
        if(!unit){
            unit=''
        }
        config = Object.assign(config, {
            statistic: {
                title: {
                    offsetY: -4,
                    customHtml: (container, view, datum) => {
                        const { width, height } = container.getBoundingClientRect();
                        const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                        const text = datum ? datum.type : '总计';
                        return renderStatistic(d, text, {
                            fontSize: 28,
                        });
                    },
                },
                content: {
                    offsetY: 4,
                    style: {
                        fontSize: '32px',
                    },
                    customHtml: (container, view, datum, data) => {
                        const { width } = container.getBoundingClientRect();
                        const text = datum ? `${unit} ${datum.value}` : `${unit} ${data.reduce((r, d) => r + d.value, 0)}`;
                        return renderStatistic(width, text, {
                            fontSize: 32,
                        });
                    },
                },
            },
        });
    }
    config = Object.assign(config, {
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    });
};
