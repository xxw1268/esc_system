import React, {Component} from 'react';
import {Form, Input, Button, notification, Row, Col, message} from 'antd';
import {connect} from 'dva';

import UpIdCard from './UpIdCard.js';
import RealUpIdCard from './RealUpIdCard.js';

let zmfile = null;
let fmfile = null;

@Form.create({
    name:'myform'
})
@connect(
    ({salecar})=>({
        ...salecar
    })
)
export default class Step1 extends Component {
    getZm (file) {
        zmfile = file;
    }
    getFm (file) {
        fmfile = file;
    }
    render () {
        const {getFieldDecorator, validateFields} = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: {span: 8}
            },
            wrapperCol: {
                sm: {span: 10}
            }
        };
        return (
            <Form {...formItemLayout}>
                <Form.Item label='身份证号码：'>
                    {
                        getFieldDecorator('idcard', {
                            rules: [
                                {
                                    required: true,
                                    message: '必须填写卖车人姓名!'
                                },
                                {
                                    pattern: new RegExp('^[0-9]{17}[0-9X]$'),
                                    message: '必须符合中国人命名法!'
                                }
                            ]
                        })(<Input />)}
                </Form.Item>
                <Row>
                    <Col span={4} offset={4}>
                        <b><span style={{'color' : 'red'}}>*</span> 请上传身份证正面照片：</b>
                    </Col>
                    <Col span={10}>
                        <UpIdCard getZm={this.getZm.bind(this)} />
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={4}>
                        <b><span style={{'color' : 'red'}}>*</span> 请上传身份证正面照片：</b>
                    </Col>
                    <Col span={10}>
                        <UpIdCard getFm={this.getFm.bind(this)} />
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={{'textAlign': 'right'}}></Col>
                    <Col span={6}>
                        <Button onClick={()=>{
                            validateFields((errors, values)=>{
                                if (errors === null){
                                    if (zmfile === null || fmfile === null){
                                        message.error('请上传身份证照片');
                                    }
                                    notification.info({
                                        key: 'aa',
                                        message: '正在上传您的身份认证并进行核实，请不要关闭页面',
                                        description: <RealUpIdCard
                                            zmfile = {zmfile}
                                            fmfile = {fmfile}
                                            alldone={()=>{
                                                this.props.dispatch({'type': 'salecar/CHANGESTEP', 'step': 2});
                                                notification.close('aa');
                                            }}
                                        />
                                    });
                                }
                            });
                        }}>下一步</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
