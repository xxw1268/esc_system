import React, {Component} from 'react';
import {Form, Input, Cascader, Button, Radio, DatePicker} from 'antd';
import {connect} from 'dva';
import Axios from 'axios';

@Form.create({
    name:'myform'
})
@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
@connect(
    ({salecar})=>({
        ...salecar
    })
)
export default class Step1 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            miao:6,
            isTime:false
        };
    }
    componentWillMount (){
        this.props.dispatch({'type': 'bigtable/ALLBSSAGA'});
    }
    render () {
        const {getFieldDecorator, validateFields} = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: {span: 4}
            },
            wrapperCol: {
                sm: {span: 8}
            }
        };
        const options = Object.keys(this.props.allbs).map(ZIMU => ({
            'label': ZIMU,
            'value': ZIMU,
            'children': Object.keys(this.props.allbs[ZIMU]).map(brand => ({
                'label': brand,
                'value': brand,
                'children': this.props.allbs[ZIMU][brand].map(series => ({
                    'label': series,
                    'value': series
                }))
            }))
        }));
        return (
            <Form {...formItemLayout}>
                <Form.Item label='姓名'>
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '必须填写卖车人姓名!'
                                },
                                {
                                    pattern: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$'),
                                    message: '必须符合中国人命名法!'
                                }
                            ]
                        })(<Input />)}
                </Form.Item>
                <Form.Item label="车架号">
                    {
                        getFieldDecorator(
                            'chejiahao',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写车架号!'
                                    },
                                    {
                                        pattern: /^\d{17}$/,
                                        message: '必须是17位数字!'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item label="品牌和车系">
                    {
                        getFieldDecorator(
                            'bs',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写品牌和车系'
                                    }
                                ]
                            }
                        )(<Cascader options={options} placeholder='请选择品牌和车系' onChange={v=>{
                            this.props.dispatch({'type': 'salecar/OPTIONSSAGA', 'options': v});
                        }}/>)
                    }
                </Form.Item>
                <Form.Item label="手机号码">
                    {
                        getFieldDecorator(
                            'mobile',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写手机号码'
                                    },
                                    {
                                        pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                                        message: '必须是11位数字'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                    <Button disabled={this.state.isTime} onClick={()=>{
                        let mobile = this.props.form.getFieldValue('mobile');
                        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)) {
                            message.error('请输入正确手机号码');
                            return;
                        }
                        this.props.dispatch({'type': 'salecar/SENDMSGSAGA', 'phone': mobile});
                        this.setState({
                            isTime: true
                        });
                        clearInterval(this.timer);
                        this.timer = setInterval(()=>{
                            this.setState({
                                miao: this.state.miao - 1
                            }, () => {
                                if (this.state.miao <= 0) {
                                    this.setState({
                                        miao: 6,
                                        isTime: false
                                    });
                                    clearInterval(this.timer);
                                }
                            });
                        }, 1000);
                    }}>
                        {
                            (()=>{
                                if (this.state.isTime) {
                                    return '已发送，请等待(' + this.state.miao + ')';
                                } else {
                                    return '发送短信验证码';
                                }
                            })()
                        }
                    </Button>
                </Form.Item>
                <Form.Item label="短信验证码">
                    {
                        getFieldDecorator(
                            'yzm',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写短信验证码'
                                    },
                                    {
                                        pattern: /^[0-9]{4}$/,
                                        message: '必须是4位数字'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item label="颜色">
                    {
                        getFieldDecorator(
                            'color',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写'
                                    }
                                ]
                            }
                        )(<Radio.Group options={['红', '橙', '黄', '绿', '蓝', '黑', '白', '灰', '香槟']}></Radio.Group>)
                    }
                </Form.Item>
                <Form.Item label="排放">
                    {
                        getFieldDecorator(
                            'exhaust',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写'
                                    }
                                ]
                            }
                        )(<Radio.Group options={['国一', '国二', '国三', '国四', '国五']}></Radio.Group>)
                    }
                </Form.Item>
                <Form.Item label="发动机">
                    {
                        getFieldDecorator(
                            'engine',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写'
                                    }
                                ]
                            }
                        )(<Radio.Group options={['1.0L', '1.2L', '1.4L', '1.6L', '1.8L', '2.0L', '3.0L', '5.0L', '1.6T']}></Radio.Group>)
                    }
                </Form.Item>
                <Form.Item label="燃料">
                    {
                        getFieldDecorator(
                            'fuel',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写'
                                    }
                                ]
                            }
                        )(<Radio.Group options={['汽油', '柴油', '纯电动', '油电混合']}></Radio.Group>)
                    }
                </Form.Item>
                <Form.Item label="购买日期">
                    {
                        getFieldDecorator(
                            'buydate',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写'
                                    }
                                ]
                            }
                        )(<DatePicker />)
                    }
                </Form.Item>
                <Form.Item label='提交'>
                    <Button onClick={()=>{
                        validateFields((errors, values)=>{
                            if (errors === null){
                                let yanzhengma = this.props.form.getFieldValue('yzm');
                                let token = this.props.token;
                                Axios.get('http://192.168.2.250:8494/cmsg.php?yanzhengma=' + yanzhengma + '&token=' + token).then(data=>{
                                    if (data.data === 'nook'){
                                        let brand = values['bs'][1];
                                        let series = values['bs'][2];
                                        let color = values['color'];
                                        let exhaust = values['exhaust'];
                                        let engine = values['engine'];
                                        let fuel = values['fuel'];
                                        let buydate = values['buydate'].unix() * 1000;
                                        this.props.dispatch({'type': 'salecar/CHANGESTEP', 'step':1, 'stepdata': {brand, series, color, exhaust, engine, fuel, buydate}});
                                    } else {
                                        message.erroe('请输入正确的手机验证码');
                                    }
                                });
                            }
                        });
                    }}>下一步</Button>
                </Form.Item>
            </Form>
        );
    }
}
