import React, {Component} from 'react';
import {connect} from 'dva';
import {Descriptions, Badge, Spin} from 'antd';
import RcViewer from '@hanyk/rc-viewer';
import moment from 'moment';

import LR from '../../../layouts/LR';
import './detail.less';

@connect(
    ({detail})=>({
        ...detail
    })
)
export default class Detail extends Component {
    componentWillMount (){
        this.props.dispatch({'type':'detail/INIT', 'id': this.props.match.params.id});
    }
    render () {
        const result = this.props.result;
        if (Object.keys(result).length === 0){
            return <Spin type='large'>正在加载，请稍后……</Spin>;
        }
        return (
            <LR>
                <h1>{this.props.match.params.id}的详情展示</h1>
                <Descriptions bordered column={4}>
                    <Descriptions.Item label="编号">{result.id}</Descriptions.Item>
                    <Descriptions.Item label="品牌">{result.brand}</Descriptions.Item>
                    <Descriptions.Item label="车系">{result.series}</Descriptions.Item>
                    <Descriptions.Item label="颜色">{result.color}</Descriptions.Item>
                    <Descriptions.Item label="购买日期">{moment(result.buydate).format('YYYY-MM-DD')}</Descriptions.Item>
                    <Descriptions.Item label="里程">{result.km.toString().replace(/\B(?=(...)+$)/g, ',')}</Descriptions.Item>
                    <Descriptions.Item label="售价">{result.price}万元</Descriptions.Item>
                    <Descriptions.Item label="燃料">{result.fuel}</Descriptions.Item>
                    <Descriptions.Item label="排放">{result.exhaust}</Descriptions.Item>
                    <Descriptions.Item label="发动机">{result.engine}</Descriptions.Item>
                    <Descriptions.Item label="变速箱">{result.gearbox}</Descriptions.Item>
                    <Descriptions.Item label="牌照">{result.license ? '有牌' : '黑户'}</Descriptions.Item>
                </Descriptions>
                <div className='imgbox'>
                    <h3>本车外观图片</h3>
                    <RcViewer options = {{
                        url (image) {
                            return image.src.replace('carimages_small', 'carimages');
                        }
                    }} ref='viewer'>
                        {
                            result.images.view.map(item => {
                                return <img key={item} src={'/api/images/carimages_small/' + this.props.id + '/view/' + item}/>;
                            })
                        }
                    </RcViewer>
                    <h3>本车内饰图片</h3>
                    <RcViewer>
                        {
                            result.images.inner.map(item => {
                                return <img key={item} src={'/api/images/carimages_small/' + this.props.id + '/inner/' + item}/>;
                            })
                        }
                    </RcViewer>
                    <h3>本车发动机图片</h3>
                    <RcViewer>
                        {
                            result.images.engine.map(item => {
                                return <img key={item} src={'/api/images/carimages_small/' + this.props.id + '/engine/' + item}/>;
                            })
                        }
                    </RcViewer>
                    <h3>本车更多图片</h3>
                    <RcViewer>
                        {
                            result.images.more.map(item => {
                                return <img key={item} src={'/api/images/carimages_small/' + this.props.id + '/more/' + item}/>;
                            })
                        }
                    </RcViewer>
                </div>
            </LR>
        );
    }
}
