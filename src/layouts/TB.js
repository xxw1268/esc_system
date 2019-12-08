import React, {Component} from 'react';
import {Layout, Menu, Avatar, Dropdown, Icon} from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import './layouts.less';

const {Header} = Layout;
@connect(({routing}) => ({
    routing
}))
@connect(({user}) => ({
    ...user
}))
export default class TB extends Component {
    componentWillMount () {
        this.props.dispatch({'type': 'user/README'});
    }
    render () {
        if (this.props.username === '') return <div></div>;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Dropdown
                        placement="topRight"
                        overlay={<Menu>
                            <Menu.Item key="1">修改资料</Menu.Item>
                            <Menu.Item key="3">更改头像</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="2">退出登录</Menu.Item>
                        </Menu>}
                    >
                        <Avatar className="avatar" src={'http://192.168.2.250:3000/images/avatars/' + this.props.avatar} />
                    </Dropdown>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{lineHeight: '64px'}}
                        onSelect={({key}) => {
                            if (key === '买车') {
                                this.props.dispatch(routerRedux.push('/buycar/bigtable'));
                            } else if (key === '卖车') {
                                this.props.dispatch(routerRedux.push('/salecar/personalcar'));
                            } else if (key === '进货') {
                                this.props.dispatch(routerRedux.push('/jinhuo/szss'));
                            }
                        }}
                        defaultSelectedKeys={this.props.c}
                    >
                        <Menu.Item key="买车">买车</Menu.Item>
                        {
                            this.props.role === 'manager' ? <Menu.Item key="卖车">卖车</Menu.Item> : null
                        }
                        <Menu.Item key="进货">进货</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {this.props.children}
                </Layout>
                <footer>
                    考拉公司 荣誉产品 &copy; 2019-2019
                </footer>
            </Layout>
        );
    }
}
