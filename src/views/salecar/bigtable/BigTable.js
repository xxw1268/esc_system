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
                {
                    [
                        {'e':'color', 'c':'颜色'},
                        {'e' : 'engine', 'c': '发动机'},
                        {'e' : 'exhaust', 'c': '尾气'},
                        {'e' : 'fuel', 'c': '燃料'}
                    ].map(item=>{
                        if (this.props[item.e].length !== 0){
                            return <Tag key={item.e} closable
                                onClose={()=>{
                                    this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k':item.e, 'v':[]});
                                }}
                            >
                                {item.c}：{this.props[item.e].join(' 或 ')}
                            </Tag>;
                        }
                    })
                }
                {
                    [
                        {'e' : 'color', 'c': '颜色', 'arr' : ['红', '橙', '黄', '绿', '蓝', '紫', '黑', '白', '灰', '银灰']},
                        {'e' : 'engine', 'c': '发动机', 'arr' : ['1.0L', '1.2L', '1.4L', '1.6L', '1.8L', '2.0L', '3.0L', '5.0L', '1.6T']},
                        {'e' : 'exhaust', 'c': '尾气', 'arr' : ['国一', '国二', '国三', '国四', '国五']},
                        {'e' : 'fuel', 'c': '燃料', 'arr' : ['汽油', '柴油', '纯电动', '油电混合']}
                    ].map(item=>{
                        return <Sizer key={item.e} arr={item.arr} e={item.e} c={item.c}></Sizer>;
                    })
                }
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
