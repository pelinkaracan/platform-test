import React from 'react';
import 'devextreme/data/odata/store';
import Chart, {
    ArgumentAxis,
    Legend,
    Series,
    ValueAxis,
    Label,
    Export,
    Tick,
} from 'devextreme-react/chart';

class CompletedOrder extends React.Component {
    customizeText(e: any) {
        return `Day ${e.value}`;
    }
  
    render() {
        const datasource = 'datas/completedOrderDatas.json';
        return (
            <div>
                <h2 className={'content-block'}>Tamamlanan  Siparişler</h2>
                <Chart
                    title="Daily Sales"
                    dataSource={datasource}
                    rotated={true}
                    id="chart"
                >

                    <ArgumentAxis>
                        <Label customizeText={this.customizeText} />
                    </ArgumentAxis>

                    <ValueAxis>
                        <Tick visible={false} />
                        <Label visible={false} />
                    </ValueAxis>

                    <Series
                        valueField="sales"
                        argumentField="day"
                        type="bar"
                        color="#79cac4"
                    >
                        <Label visible={true} backgroundColor="#c18e92" />
                    </Series>

                    <Legend visible={false} />

                    <Export enabled={true} />

                </Chart>
            </div>
        )
    }
}

export default CompletedOrder;


