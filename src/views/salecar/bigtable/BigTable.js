import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Button, Tag} from 'antd';

import columnsMap from './columnsMap';
import './bigtableLess.less';
import ModalInner from './ModalInner.js';
import Sizer from './Sizer.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ShowColumnModal:false
        };
    }
    componentWillMount (){
        this.props.dispatch({'type':'bigtable/GETLOCALSTPRAGE'});
        this.props.dispatch({'type':'bigtable/INIT'});
    }
    render () {
        return (
            <div>
                <Sizer/>
                <Modal
                    title='选择显示的列表项'
                    visible={this.state.ShowColumnModal}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            ShowColumnModal:false
                        });
                    }}
                >
                    <ModalInner ref='modalinner'
                        okHan={(columns)=>{
                            this.props.dispatch({'type':'bigtable/SETCOLUMNTOTALSTORAGE', columns});
                            this.setState({
                                ShowColumnModal:false
                            });
                        }}
                        canHan={()=>{
                            this.setState({
                                ShowColumnModal:false
                            });
                        }}
                    />
                </Modal>
                <div className='iconbox'>
                    <Button
                        className='icon'
                        type="primary"
                        shape="circle"
                        icon="setting"
                        onClick={()=>{
                            this.setState({
                                ShowColumnModal:true
                            });
                        }}
                    />
                </div>
                <Table
                    rowKey='id'
                    columns={
                        this.props.columnArr.map(str=>({
                            'key':str,
                            'dataIndex':str,
                            ...columnsMap[str]
                            //...columnsMap[str]：输出结果为'title':'...'
                        }))}
                    dataSource={this.props.results}
                    pagination={{
                        total:this.props.total,
                        current:this.props.current,
                        pageSize:this.props.pageSize,
                        onChange:(current)=>{
                            this.props.dispatch({'type':'bigtable/CURRENTSAGA', 'current':current});
                        }
                    }}
                />
            </div>
        );
    }
}
