//Import from React
import React from 'react';
//Import from Ant Design
import {Table, Divider} from 'antd';

const columns = [
    {
        title:'Name',
        dataIndex: 'name',
        key:'name',
        width:150,
        render: text => <a href="javascript::">{text}</a>,
    },
    {
        title:'Age',
        dataIndex: 'age',
        key:'age',
        width:70,
    },
    {
        title:'Address',
        dataIndex: 'address',
        key:'address',
    },
    {
        title:'Action',
        dataIndex: 'action',
        width:360,
        render: (text, record) => (
            <span>
        <a href="javascript::">Action - {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript::">Delete</a>
        <Divider type="vertical" />
        <a href="javascript::">More actions</a>
        </span>
        ),
    },
]

const data = [];
for (let i=1;i<=10;i++) {
    data.push({
        key: 1,
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown.`
    });
}

class MonitorList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bordered: true,
            loading:false,
            pagination: {position:'bottom'},
            size: 'default',
            expandedRowRender: record => <p>{record.description}</p>,
            title: () => 'Here is title',
            showHeader: true,
            footer: () => 'Here is footer',
            rowSelection: {},
            scroll: {y:240},
            hasData: true,
        };    
    }

    componentDidMount() {
        
    }

    // handleTimeRangeChange = timeRange => {
    //     this.setState({ timeRange })
    // };

    // setModeLinear = () => {
    //     this.setState({ mode: "linear" })
    // }

    // setModeLog = () => {
    //     this.setState({ mode: "log" })
    // }

    // renderChart = () => {
    //     return (
    //         <ChartContainer
    //             timeRange={this.state.timeRange}
    //             hideWeekends={true}
    //             enablePanZoom={true}
    //             onTimeRangeChanged={this.handleTimeRangeChange}
    //             timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
    //         >
    //             {Array.from(this.state.seriesMap.keys()).filter(mapKey => mapKey === "AAPL200619C00170000" || mapKey === "AAPL200619C00175000").map(mapKey => {
    //                 const croppedSeries = this.state.seriesMap.get(mapKey).crop(this.state.timeRange);
    //                 console.log(mapKey);
    //                 return (
    //                     <ChartRow key={mapKey} height="300">
    //                         <Charts>
    //                             <LineChart
    //                                 axis="y"
    //                                 style={{ LastPrice: { normal: { stroke: "steelblue" } } }}
    //                                 columns={["LastPrice"]}
    //                                 series={croppedSeries}
    //                                 interpolation="curveLinear"
    //                             />
    //                         </Charts>
    //                         <YAxis
    //                             id="y"
    //                             label="Price ($)"
    //                             min={croppedSeries.min("LastPrice")}
    //                             max={croppedSeries.max("LastPrice")}
    //                             format=",.2f"
    //                             width="60"
    //                             type={this.state.mode}
    //                         />
    //                     </ChartRow>
    //                 )
    //             })}
    //         </ChartContainer>
    //     )
    // }

    render() {
        return (
            <div>
                <Table {...this.state} columns={columns} dataSource={this.state.hasData ? data : null} />
            </div>
        )
    }
}

export default MonitorList;