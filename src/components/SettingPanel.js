//Import from React
import React from 'react';
//Import from Ant Design
import { Input, Select, Button, message } from 'antd';
//Import from reqwest
import reqwest from 'reqwest';
//Import from Constant.js
import { url_tag_create, url_tag_read, url_tag_delete, url_symbol_create, url_symbol_delete } from './Constant'

class SettingPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            tagToDelete: "",
            // loading: false,
            // hasMore: true,
        };
    }

    componentDidMount() {
        this.updateTagList(res => {
            this.setState({
                tags: res,
                tagToDelete: "",
            });
        })
    }

    // fetchData = callback => {
    //     console.log(url_symbol_list)
    //     reqwest({
    //         url: url_symbol_list, //'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo', 
    //         type: 'json',
    //         method: 'get',
    //         contentType: 'application/json',
    //         error: err => {
    //             console.log("Error:" + err.statusText)
    //         },
    //         success: res => {
    //             console.log("Retrieved symbols " + res.length)
    //             callback(res);
    //         },
    //     });
    // };
    updateTagList = callback => {
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
                this.props.updateTagList(res);
                callback(res)
            },
        });
    }

    btnOnClick_createTag = (value) => {
        message.warning("Button Clicked - Create Tag")
        reqwest({
            url: url_tag_create.replace("{tag}", encodeURIComponent(value)),
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            error: err => {
                message.error("Error: " + err.body)
            },
            success: res => {
                message.success("Tag Created: " + value)
                this.updateTagList(res => {
                    this.setState({
                        tags: res,
                    });
                })
            },
        });
    };

    selectTagToDelete = (value) => {
        this.setState({
            tagToDelete: value,
        })
    }

    btnOnClick_deleteTag = (event) => {
        const { tagToDelete } = this.state
        message.warning("Button Clicked - Delete Tag " + tagToDelete)
        reqwest({
            url: url_tag_delete.replace("{tag}", encodeURIComponent(tagToDelete)),
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            error: err => {
                message.error("Error: " + err.body)
            },
            success: res => {
                message.success("Tag Deleted: " + tagToDelete)
                this.updateTagList(res => {
                    this.setState({
                        tags: res,
                        tagToDelete: "",
                    });
                })
            },
        });
    };

    btnOnClick_createSymbol = (value) => {
        message.warning("Button Clicked - Create Symbol")
        reqwest({
            url: url_symbol_create.replace("{symbols}", encodeURIComponent(value)),
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            error: err => {
                message.error("Error: " + err.body)
            },
            success: res => {
                message.success(res)
                this.props.updateSymbolList()
            },
        });
    };

    btnOnClick_deleteSymbol = (value) => {
        message.warning("Button Clicked - Delete Symbol")
        reqwest({
            url: url_symbol_delete.replace("{symbols}", encodeURIComponent(value)),
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            error: err => {
                message.error("Error: " + err.body)
            },
            success: res => {
                message.success(res)
                this.props.updateSymbolList()
            },
        });
    };

    render() {
        return (
            <div className="settingpanel-container">
                <div className="settingpanel-tag-container">
                    <Input.Search
                        placeholder="Tag to Create"
                        enterButton="Create Tag"
                        size="large"
                        onSearch={this.btnOnClick_createTag}
                    />
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Tag to Delete"
                        defaultValue={this.state.tagToDelete}
                        showArrow={true}
                        onChange={this.selectTagToDelete}
                    >
                        {this.state.tags.length > 0 ? this.state.tags.map(tag => {
                            return (
                                <Select.Option key={tag} value={tag}>{tag}</Select.Option>
                            )
                        }) : null}
                    </Select>
                    <Button type="primary" onClick={this.btnOnClick_deleteTag}>Delete Tag</Button>
                </div>
                <div className="settingpanel-symbol-container">
                    <Input.Search
                        placeholder="Symbol to Create. Seperate by ';'"
                        enterButton="Create Symbol"
                        size="large"
                        onSearch={this.btnOnClick_createSymbol}
                    />
                    <Input.Search
                        placeholder="Symbol to Delete. Seperate by ';'"
                        enterButton="Delete Symbol"
                        size="large"
                        onSearch={this.btnOnClick_deleteSymbol}
                    />
                </div>
            </div >
        )
    }
}

export default SettingPanel;