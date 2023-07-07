import { DemoLine } from './antdChart/line/basicLine';
import { linedata } from './antdChart/line/line.stories';
import { AntdGauge } from './antdChart/process/gauge';
import { DemoLine2 } from './component/line';

const App: React.FC = () => {
    return (
        <>
            {/* <DemoLine xField={'Date'} yField={'scales'} data={linedata} xAxis={{ tickCount: 5 }}></DemoLine>
            <DemoLine2></DemoLine2> */}
            <AntdGauge percent={0.75} statistic={{ title: ['差', '中', '优'], content: '系统表现' }}></AntdGauge>
        </>
    );
};
export default App;
