import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, DatePicker, Button} from 'antd';

const {RangePicker} = DatePicker;

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class BuyDate extends Component {
    constructor (props) {
        super(props);
        this.state = {
            buydate:[]
        };
    }

    render () {
        return (
            <div>
                <Row className='myrow' style={{'display':this.props.buydate.length === 0 ? 'block' : 'none'}}>
                    <Col span={2}>
                        <b>购买日期：</b>
                    </Col>
                    <Col span={16}>
                        <RangePicker
                            onChange={arr=>{
                                //arr是moment对象的数组
                                const v = arr.map(item=>item.unix() * 1000);
                                this.setState({
                                    buydate:v
                                });
                            }}
                        />
                    </Col>
                    <Col span={2} offset={2}>
                        <Button onClick={()=>{
                            this.props.dispatch({'type':'bigtable/FILTERSAGA', 'k':'buydate', v:this.state.buydate});
                        }}
                        >确定</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
