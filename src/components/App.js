import React from 'react';
// import logo from './logo.svg';
import OptionFollower from './OptionFollower';
import OptionReportTab from './OptionReportTab';
import SymbolList from './SymbolList';
import SettingPanel from './SettingPanel';
//Import from Ant Design
import { Layout, Tabs, message } from 'antd'
//Import from reqwest
import reqwest from 'reqwest';
//Import from Constant.js
import { url_tag_read, url_symbol_list, url_read_symbol_by_tags, url_read_all_symbol } from './Constant'

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    symbols: [],
    tags: [],
  }

  componentDidMount() {
    this.handleUpdateTagList(this.updateTagList)
    this.handleUpdateSymbolList(this.updateSymbolList)
  }

  updateTagList = data => {
    this.setState({
      tags: data,
    });
  }

  handleUpdateTagList = callback => {
    message.warning("Update tag list")
    reqwest({
      url: url_tag_read,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      error: err => {
        message.error("Error: " + err.body)
        callback([])
      },
      success: res => {
        message.success("Tag Read.");
        callback(res)
      },
    });
  }

  updateSymbolList = data => {
    this.setState({
      symbols: data,
    });
  }

  handleUpdateSymbolList = callback => {
    message.warning("Update symbol list")
    reqwest({
      url: url_read_all_symbol,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      error: err => {
        message.error("Error: " + err.body)
        callback([])
      },
      success: res => {
        message.success("Symbol Read.");
        callback(res);
      },
    });
  };

  handleUpdateSymbolListByTag = (tags, callback) => {
    message.warning("Update symbol list")
    reqwest({
      url: url_read_symbol_by_tags.replace("{tags}", encodeURIComponent(tags)),
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      error: err => {
        message.error("Error: " + err.body)
        callback([])
      },
      success: res => {
        message.success("Symbol Read By Tags.");
        callback(res);
      },
    });
  };

  render() {
    return (
      <Layout
        className="App"
      //style={}
      >
        <Header className="App-header">
        </Header>

        <Layout>

          <Sider
            className="App-sider"
            breakpoint="xl"
          >
            <SymbolList
              symbols={this.state.symbols}
              tags={this.state.tags}
              updateSymbolList={this.updateSymbolList}
              handleUpdateSymbolList={this.handleUpdateSymbolList}
              handleUpdateSymbolListByTag={this.handleUpdateSymbolListByTag}
            />
          </Sider>

          <Content>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Tab 1" key="1">
                <OptionFollower />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Option Report" key="2">
                <OptionReportTab />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Tab 3" key="3">
                <SettingPanel
                  updateTagList={this.updateTagList}
                  updateSymbolList={() => {this.handleUpdateSymbolList(this.updateSymbolList)}}
                />
              </Tabs.TabPane>
            </Tabs>
          </Content>

        </Layout>

        <Footer>
        </Footer>
      </Layout>
    );
  }
}
export default App;
