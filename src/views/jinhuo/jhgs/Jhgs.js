import React, {Component} from 'react';
import LR from '../../../layouts/LR.js';
import {connect} from 'dva';
import {Table} from 'antd';

@connect(({jhgs}) => ({
    ...jhgs
}))
export default class Jhgs extends Component {
    componentWillMount () {
        this.props.dispatch({'type': 'jhgs/INIT'});
    }

    render () {
        return (
            <LR c="进货" d='全部进货单'>
                <Table
                    rowKey="id"
                    dataSource={this.props.results}
                    columns={[
                        {'title': '进货单编号', 'key': 'id', 'dataIndex': 'id'},
                        {'title': '多少东西', 'key': 'thingamount', 'dataIndex': 'thingamount'},
                        {'title': '啥电商', 'key': 'shop', 'dataIndex': 'shop'},
                        {'title': '啥仓库', 'key': 'storage', 'dataIndex': 'storage'},
                        {'title': '时间戳', 'key': 'time', 'dataIndex': 'time'}
                    ]}
                />
            </LR>
        );
    }
}
