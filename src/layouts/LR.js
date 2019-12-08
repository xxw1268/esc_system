import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {connect} from 'dva';
import TB from './TB.js';
import {routerRedux, Link} from 'dva/router';

const {Content, Sider} = Layout;

@connect(({routing}) => ({
    routing
}))
export default class LR extends Component {
    render () {
        const map = {
            '买车': [
                {'title': '大表买车', 'path': '/buycar/bigtable'},
                {'title': '抢劫买车', 'path': '/buycar/qjmc'},
                {'title': '贷款买车', 'path': '/buycar/dkmc'}
            ],
            '卖车': [
                {'title': '个人卖车', 'path': '/salecar/personalcar'},
                {'title': '公司卖车', 'path': '/salecar/gsmc'}
            ],
            '进货': [
                {'title': '添加进货单', 'path': '/jinhuo/szss'},
                {'title': '全部进货单', 'path': '/jinhuo/jhgs'}
            ]
        };
        return (
            <TB c={this.props.c}>
                <Sider width={200} style={{background: '#fff'}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[this.props.d]}
                        style={{height: '100%', borderRight: 0}}
                    >
                        {
                            map[this.props.c].map(item => <Menu.Item key={item.title} onClick={()=>{
                                this.props.dispatch(routerRedux.push(item.path));
                            }}>
                                {item.title}
                            </Menu.Item>)
                        }
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={map[this.props.c][0].path}>{this.props.c}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.d}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </TB>
        );
    }
}
