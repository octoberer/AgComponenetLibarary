import React from 'react';
import { EyeOutlined} from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

interface SelfCardType {
    params: {
        title: string;
        description: string;
        componentSrc: string;
    };
}

const SelfCard: React.FC<SelfCardType> = ({ params }) => {
    const { title, description, componentSrc } = params;
    return (
        <Card
            style={{ width: 300 }}
            cover={<img alt="componentpic" src={componentSrc}/>}
            actions={[<EyeOutlined  key="scan" />]}
        >
            <Meta
                title={title}
                description={description}
            />
        </Card>
    );
};
export default SelfCard;
