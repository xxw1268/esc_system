import React, {Component} from 'react';
import {Input, Row, Col} from 'antd';

export default class ModalInner extends Component {
    render () {
        return (
            <div>
                生产<b style={{'color': 'red'}}>{this.props.nowItem.name}</b>的工厂有：
                <div>
                    {
                        this.props.nowItem.factory.map(f=>{
                            return <div key={f} style={{'margin': '10px 0'}}>
                                <Row>
                                    <Col span={6}>
                                        <b>{f}</b>工厂，进货数量:
                                    </Col>
                                    <Col span={10} offset={2}>
                                        <Input />
                                    </Col>
                                </Row>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}
