import { Liquid } from '@ant-design/plots';
interface AntdLiquidType {
    /**
     *   水波高度所赞百分比
     */
    percent: number;
    /**
     *   设置外围风格。border设置边框大小，distance设置外界离内核的距离，style设置border的颜色和透明度
     */
    outline?: {
        border: number;
        distance: number;
        style?: {
            stroke?: string;
            strokeOpacity?: number;
        };
    };
    /**
     *   设置每一单位的水波长度
     */
    wavelength: number;
    /**
     *   设置形状
     */
    shape?:'circle' | 'rect'|'roundRect'|'triangle'|'diamond';
    /**
     *   设置主题色，其影响内核和外部的颜色，优先级低于outline的stroke
     */
    themeColor?: string;
}
export const AntdLiquid = ({ percent, outline, wavelength, themeColor, shape }: AntdLiquidType) => {
    let config = {
        percent,
        outline,
        wave: {
            length: wavelength,
        },
        shape,
    };
    if (themeColor) {
        config = Object.assign(config, {
            theme: {
                styleSheet: {
                    brandColor: themeColor,
                },
            },
            outline: {
                style: {
                    stroke: themeColor,
                    strokeOpacity: 0.65,
                },
                ...outline,
            },
        });
    }
    return <Liquid {...config} />;
};
