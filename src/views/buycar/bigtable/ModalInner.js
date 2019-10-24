import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Button, Icon} from 'antd';

import OneSmall from './OneSmall.js';
import columnsMap from './columnsMap.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class ModalInner extends Component {
    constructor (props) {
        super(props);
        let beixuanArr = _.difference(Object.keys(columnsMap), props.columnArr);
        this.state = {
            columnArr:props.columnArr.slice(),
            beixuanArr
        };
    }
    deloneitem (english){
        this.setState({
            columnArr:this.state.columnArr.filter(item=>item !== english),
            beixuanArr:[...this.state.beixuanArr, english]
        });
    }
    render () {
        return (
            <div>
                <h3>当前以为您展示的列(可拖拽排序):</h3>
                <div className='onesmallbox'>
                    {
                        this.state.columnArr.map((item, i)=>{
                            return <OneSmall
                                key={i}
                                onSortItems={(columnArr)=>{
                                    this.setState({
                                        columnArr
                                    });
                                }}
                                items={this.state.columnArr}
                                sortId={i}
                                english={item}
                                chinese={columnsMap[item].title}
                                other={{
                                    deloneitem:this.deloneitem.bind(this)
                                }}
                            >
                            </OneSmall>;
                        })
                    }
                </div>
                <div className="clear"></div>
                <h3>备选列表项(点击'+'添加)：</h3>
                <div className='beixuanbox'>
                    {
                        this.state.beixuanArr.map((item, i)=>{
                            return <span key={i}>
                                {columnsMap[item].title}
                                <b
                                    onClick={()=>{
                                        this.setState({
                                            columnArr:[...this.state.columnArr, item],
                                            beixuanArr:this.state.beixuanArr.filter(_item=>_item !== item)
                                        });
                                    }}
                                ><Icon type='plus'/></b>
                            </span>;
                        })
                    }
                </div>
                <div className="clear"></div>
                <div className='btnbox'>
                    <Button
                        onClick={()=>{
                            this.props.canHan(this.state.canHan);
                        }}
                    >取消</Button>
                    <Button
                        onClick={()=>{
                            this.props.okHan(this.state.columnArr);
                        }}
                    >确定</Button>
                </div>
            </div>
        );
    }
}
