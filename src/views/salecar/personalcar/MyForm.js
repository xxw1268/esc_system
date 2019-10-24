import React, {Component} from 'react';
import {Form, Input, Cascader, Button} from 'antd';
import {connect} from 'dva';

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
export default class MyForm extends Component {
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
        const {getFieldDecorator} = this.props.form;
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
                            'brand 和 series',
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
                {this.props.token}
            </Form>
        );
    }
}
