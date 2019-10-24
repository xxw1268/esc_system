import React, {Component} from 'react';
import {Steps} from 'antd';

import LR from '../../../layouts/LR.js';
import './personalcar.less';
import MyForm from './MyForm.js';

const {Step} = Steps;

export default class PerSonalCar extends Component {
    render () {
        return (
            <LR>
                <div className='personalbox'>
                    <h1>卖车信息资料填写</h1>
                    <Steps current={0}>
                        <Step title='基本资料填写'/>
                        <Step title='证件照片上传'/>
                        <Step title='车辆照片上传'/>
                        <Step title='卖车信息填写成功'/>
                    </Steps>
                    <div style={{'marginTop':30}}>
                        <MyForm/>
                    </div>
                </div>
            </LR>
        );
    }
}
