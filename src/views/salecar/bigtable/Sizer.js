import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col} from 'antd';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class Sizer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            mode:false,
            arr:[]
        };
    }
    render () {
        const {arr, e, c} = this.props;
        return (
            <div>
                <div className='btnbox'>
                    <Row
                        style={{'display':this.state.mode === false && this.props[e].length !== 0 ? 'none' : 'block'}}
                    >
                        <Col span={2}>
                            <b>{c}：</b>
                        </Col>
                        <Col span={16}>
                            {
                                arr.map(item=>{
                                    return <Button
                                        style={{
                                            'float':'left'
                                        }}
                                        key={item}
                                        value={item}
                                        onClick={()=>{
                                            if (this.state.mode === false){
                                                this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k':e, 'v':[item]});
                                            } else {
                                                if (!this.state.arr.includes(item)){
                                                    this.setState({
                                                        arr:[...this.state.arr, item]
                                                    });
                                                } else {
                                                    this.setState({
                                                        arr:this.state.arr.filter(_item=>_item !== item)
                                                    });
                                                }
                                            }
                                        }}
                                        type={this.state.arr.includes(item) ? 'primary' : 'null'}
                                    >{item}</Button>;
                                })
                            }
                        </Col>
                        <Col span={2} offset={2}>
                            <Button
                                type={this.state.mode === false ? 'null' : 'primary'}
                                onClick={()=>{
                                    this.setState({
                                        mode : !this.state.mode
                                    });
                                    if (this.state.mode !== false){
                                        this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k':e, 'v':this.state.arr});
                                        this.setState({
                                            arr:[]
                                        });
                                    }
                                }}
                            >
                                {this.state.mode === false ? '多选' : '确定'}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
