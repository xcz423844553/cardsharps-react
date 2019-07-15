//Import from React
import React from 'react';
import moment from 'moment';
//Import from Ant Design

//Import from Pond
import { Collection, TimeSeries, TimeEvent, TimeRange } from 'pondjs';
import { ChartContainer, ChartRow, Charts, LineChart, YAxis, Resizable } from 'react-timeseries-charts';

import aapl from "../assets/data/aapl_historical_option.json";


class OptionFollower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Start and end of time series
            timeRange: new TimeRange(moment("2019-05-10 10:00", "YYYY-MM-DD HH:mm"), moment("2019-05-30 10:00", "YYYY-MM-DD HH:mm")),
            //Display mode of time series: linear or log
            mode: "linear",
            seriesMap: new Map(),
        };
    }

    componentDidMount() {
        var contractSymbolMap = new Map();
        var seriesMap = new Map();
        const columns = ["ContractSymbol", "Date", "Symbol", "OptionType", "Strike", "LastPrice", "PriceChange", "PercentChange",
            "Volume", "PrevVolume", "OpenInterest", "Bid", "Ask", "Expiration", "ImpliedVolatility", "InTheMoney", "UpdatedTime"];
        aapl.map(item => {
            const timestamp = moment(item.Date.toString(), "YYYYMMDD");
            const { ContractSymbol, Symbol, OptionType, Strike, LastPrice, PriceChange, PercentChange,
                Volume, PrevVolume, OpenInterest, Bid, Ask, Expiration, ImpliedVolatility, InTheMoney, UpdatedTime } = item;
            const te = new TimeEvent(
                timestamp.toDate(),
                {
                    ContractSymbol,
                    Date,
                    Symbol,
                    OptionType,
                    Strike,
                    LastPrice,
                    PriceChange,
                    PercentChange,
                    Volume,
                    PrevVolume,
                    OpenInterest,
                    Bid,
                    Ask,
                    Expiration,
                    ImpliedVolatility,
                    InTheMoney,
                    UpdatedTime,
                }
            );
            if (contractSymbolMap.has(ContractSymbol)) {
                contractSymbolMap.get(ContractSymbol).push(te);
            } else {
                let events = [te];
                contractSymbolMap.set(ContractSymbol, events);
            }
            return "";
        });
        for (var [key, value] of contractSymbolMap.entries()) {
            const collection = new Collection(value);
            const sortedCollection = collection.sortByTime();
            seriesMap.set(key, new TimeSeries({ key, columns, collection: sortedCollection }));
        }
        this.setState({ seriesMap })
    }

    handleTimeRangeChange = timeRange => {
        this.setState({ timeRange })
    };

    setModeLinear = () => {
        this.setState({ mode: "linear" })
    }

    setModeLog = () => {
        this.setState({ mode: "log" })
    }

    renderChart = () => {
        return (
            <ChartContainer
                timeRange={this.state.timeRange}
                hideWeekends={true}
                enablePanZoom={true}
                onTimeRangeChanged={this.handleTimeRangeChange}
                timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
            >
                {Array.from(this.state.seriesMap.keys()).filter(mapKey => mapKey === "AAPL200619C00170000" || mapKey === "AAPL200619C00175000").map(mapKey => {
                    const croppedSeries = this.state.seriesMap.get(mapKey).crop(this.state.timeRange);
                    console.log(mapKey);
                    return (
                        <ChartRow key={mapKey} height="300">
                            <Charts>
                                <LineChart
                                    axis="y"
                                    style={{ LastPrice: { normal: { stroke: "steelblue" } } }}
                                    columns={["LastPrice"]}
                                    series={croppedSeries}
                                    interpolation="curveLinear"
                                />
                            </Charts>
                            <YAxis
                                id="y"
                                label="Price ($)"
                                min={croppedSeries.min("LastPrice")}
                                max={croppedSeries.max("LastPrice")}
                                format=",.2f"
                                width="60"
                                type={this.state.mode}
                            />
                        </ChartRow>
                    )
                })}
            </ChartContainer>
        )
    }

    render() {
        return (
            <div>
                <Resizable>{this.renderChart()}</Resizable>
            </div>
        )
    }
}

export default OptionFollower;