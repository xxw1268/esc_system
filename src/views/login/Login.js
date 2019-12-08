import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {routerRedux} from 'dva/router';
import './login.less';
import {connect} from 'dva';


@connect(
    ({user}) => ({
        ...user
    })
)
export default class Login extends Component {
    // 组件将要收到新的props
    componentWillReceiveProps (nextProps) {
        if (nextProps.role !== '') {
            // 跳转
            this.props.dispatch(routerRedux.push('/'));
        }
    }

    render () {
        return (
            <div className="loginwrap">
                <div className="inner">
                    <h1>考拉进销存管理系统{this.props.role}</h1>
                    <div className="rdiv">
                        <Input
                            prefix={<Icon type="user" style={{'color': 'rgba(0,0,0,.25)'}} />}
                            placeholder="请输入用户名"
                            ref="username"
                        />
                    </div>
                    <div className="rdiv">
                        <Input
                            prefix={<Icon type="lock" style={{'color': 'rgba(0,0,0,.25)'}} />}
                            placeholder="请输入密码"
                            ref="password"
                        />
                    </div>
                    <div className="rdiv">
                        <Button type="primary" onClick={()=>{
                            this.props.dispatch({
                                'type': 'user/LOGIN',
                                'username': this.refs.username.state.value,
                                'password': this.refs.password.state.value
                            });
                        }}>登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}
