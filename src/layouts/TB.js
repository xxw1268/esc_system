import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import './layout.less';

const {Header} = Layout;

export default class TB extends Component {
    render () {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {this.props.children}
                </Layout>
            </Layout>
        );
    }
}
