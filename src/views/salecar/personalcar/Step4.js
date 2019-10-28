import React, {Component} from 'react';
import {Result, Button} from 'antd';

export default class Step4 extends Component {
    render () {
        return (
            <div>
                <Result
                    status='success'
                    title='成功添加车辆信息'
                    subTitle=''
                    extra={[
                        <Button type="primary" key="console">
                            再次添加
                        </Button>,
                        <Button key="buy">买车页面</Button>
                    ]}
                />
            </div>
        );
    }
}
