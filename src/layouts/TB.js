import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {Link} from 'dva/router';
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
                        <Menu.Item key="1"><Link to='/buycar/bigtable'>买车</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/salecar/personalcar'>卖车</Link></Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {this.props.children}
                </Layout>
            </Layout>
        );
    }
}
