import { DemoLine } from './antdChart/line/basicLine';
import { linedata } from './antdChart/line/line.stories';
import { DemoLine2 } from './component/line';

const App: React.FC = () => {
    return (
        <>
            <DemoLine xField={'Date'} yField={'scales'} data={linedata} xAxis={{ tickCount: 5 }}></DemoLine>
            <DemoLine2></DemoLine2>
        </>
    );
};
export default App;
