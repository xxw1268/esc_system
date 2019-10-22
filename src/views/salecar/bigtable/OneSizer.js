import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Button} from 'antd';
import classnames from 'classnames';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class Sizer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            arr:[],
            mode:false
        };
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps[this.props.e] !== this.props[this.props.e]){
            this.setState({
                mode:false,
                arr:[]
            });
        }
    }
    render () {
        const {c, e, options} = this.props;
        return (
            <div className='myrow' style={{'display': this.props[e].length === 0 ? 'block' : 'none'}}>
                <Row>
                    <Col span={2}>
                        <b>{c}</b>
                    </Col>
                    <Col span={16}>
                        {
                            options.map(item=><span
                                className={classnames(['myspan', {
                                    'cur':this.state.arr.includes(item)
                                }])}
                                key={item}
                                onClick={()=>{
                                    if (this.state.mode){
                                        if (this.state.arr.includes(item)){
                                            this.setState({
                                                arr:this.state.arr.filter(_item => item !== item)
                                            });
                                        } else {
                                            this.setState({
                                                arr:[...this.state.arr, item]
                                            });
                                        }
                                    } else {
                                        this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k': e, 'v': [item]});
                                    }
                                }}
                            >
                                {item}
                            </span>)
                        }
                    </Col>
                    <Col span={2} offset={2}>
                        {
                            this.state.mode ? <Button type="primary" onClick={()=>{
                                this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k': e, 'v': this.state.arr});
                            }}>确定</Button> : <Button onClick={()=>{
                                this.setState({
                                    mode:true
                                });
                            }}>多选</Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
