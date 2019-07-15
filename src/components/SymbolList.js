//Import from React
import React from 'react';
//Import from Ant Design
import { List, Spin, message, Select, Empty } from 'antd';
//Import from react-infinite-scroller
import InfiniteScroll from 'react-infinite-scroller';
//Import from reqwest
import reqwest from 'reqwest';
//Import from Constant.js
import { url_symbol_list } from './Constant'

class SymbolList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            tagSelectStatus:true,
        };
    }

    componentDidMount() {
    }

    handleInfiniteOnLoad = () => {
        // let { symbols } = this.state
        // this.setState({
        //     loading: true,
        // });
        // for (let i = startIndex; i <= stopIndex; i++) {
        //     this.loadedRowsMap[i] = 1;
        // }
        // if (symbols.length > 19) {
        //     message.warning('Virtualized list loaded all');
        //     this.setState({
        //         hasMore:false,
        //         loading: false,
        //     });
        //     return;
        // }
        // this.fetchData(res => {
        //     symbols = symbols.concat(res.results);
        //     this.setState({
        //         symbols,
        //         loading: false,
        //     });
        // });
    }

    handleTagFilterChange = (value) => {
        if (value === "" || value.length == 0) {
            this.props.handleUpdateSymbolList(this.props.updateSymbolList);
        } else {
            this.props.handleUpdateSymbolListByTag(value.join(';'), this.props.updateSymbolList)
        }
        message.warning("Handle Tag Filter Change")
    }

    renderItem = (item) => {
        const style = {}
        return (
            <List.Item key={item.quote} style={style}>
                <List.Item.Meta
                    title={<a href="https://ant.design">{item.quote}</a>}
                    description={item.company}
                />
            </List.Item>
        );
    };

    render() {
        return (
            <div className="symbol-list-container">
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Tag Filter"
                    onChange={this.handleTagFilterChange}
                    allowClear={true}
                >
                    {this.props.tags.length > 0 ? this.props.tags.map(tag => {
                        return (
                            <Select.Option key={tag} value={tag}>{tag}</Select.Option>
                        )
                    }) : null}
                </Select>
                <div className="symbollist-infinite-list-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        //hasMore={!this.state.loading && this.state.hasMore}
                        hasMore={true}
                        useWindow={false}
                        loader={<Spin tip="Loading..."></Spin>}
                    >
                        {this.props.symbols.length > 0 ?
                            <List
                                dataSource={this.props.symbols}
                                renderItem={this.renderItem}
                            >
                                {/* {this.state.loading && this.state.hasMore && (
                                    <div className="symbollist-loading-container">
                                        <Spin />
                                    </div>
                                )} */}
                            </List> : null
                        }
                    </InfiniteScroll>
                </div>
            </div >
        )
    }
}

export default SymbolList;