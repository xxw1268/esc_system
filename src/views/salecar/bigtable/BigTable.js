import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

import columnsMap from './columnsMap.js';
import './bigtableLess.less';
import ModalInner from './ModalInner.js';

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
        this.props.dispatch({'type':'bigtable/GETCOLUMNSFROMLOCALSTORAGE'});
        this.props.dispatch({'type':'bigtable/INIT'});
    }

    render () {
        return (
            <div>
                <Modal
                    title='调整表格列的显示'
                    visible={this.state.ShowColumnModal}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            ShowColumnModal:false
                        });
                    }}
                >
                    <ModalInner ref='modalinner'
                        okHandler={(columns)=>{
                            this.props.dispatch({'type':'bigtable/SETCOLUMNSTOLOCALSTORAGE', columns});
                            this.setState({
                                ShowColumnModal:false
                            });
                        }}
                        cancelHnanler={(columns)=>{
                            this.setState({
                                ShowColumnModal:false
                            });
                        }}
                    />
                </Modal>
                <div className='iconbox'>
                    <Button
                        type='primary'
                        shape='circle'
                        icon='setting'
                        className='icon'
                        onClick={()=>{
                            this.setState({
                                ShowColumnModal:true
                            });
                        }}
                    ></Button>
                </div>
                <Table
                    rowKey='id'
                    columns={
                        this.props.columnArr.map(str => ({
                            'key': str,
                            'dataIndex': str,
                            ...columnsMap[str]
                        }))
                    }
                    dataSource={this.props.results}
                    pagination={{
                        total:this.props.total
                    }}
                />
            </div>
        );
    }
}
