import React, {Component} from 'react';
import LR from '../../../layouts/LR.js';
import {Tabs, Input, Badge, Modal, Radio, Button} from 'antd';
import {connect} from 'dva';
import './szss.less';
import ModalInner from './ModalInner.js';
import Cpts from './Cpts.js';
import Gcts from './Gcts.js';

const {TabPane} = Tabs;

@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class Szss extends Component {
    constructor () {
        super();
        this.state = {
            'isShowModel': false,
            'keyword': '',
            'nowItem': {},
            'view': '以产品透视'
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'szss/LOADPRODUCTS'});
    }

    sosuoCount (typeName) {
        if (this.state.keyword === '') return 0;
        // reduce表示揉吧揉吧出个数
        return this.props.products[typeName].reduce((a, b) => {
            if (b.name.includes(this.state.keyword)) return a + 1;
            return a;
        }, 0);
    }

    render () {
        return (
            <LR c="进货" d="添加进货单">
                <div>
                    搜索：
                    <Input value={this.state.keyword} onChange={e => {
                        this.setState({
                            keyword: e.target.value
                        });
                    }} style={{'width': '300px'}}/>
                </div>
                <Tabs defaultActiveKey='1'>
                    {
                        Object.keys(this.props.products).map(typeName => <TabPane
                            key={typeName}
                            tab={
                                <Badge count={this.sosuoCount(typeName)}>
                                    {typeName}
                                </Badge>
                            }
                        >
                            {
                                this.props.products[typeName].filter(item => item.name.includes(this.state.keyword)).map(item => <div
                                    className='ge'
                                    key={item.name}
                                    onClick={() => {
                                        this.setState({
                                            'isShowModel': true,
                                            'nowItem': item
                                        });
                                    }}
                                >
                                    <p>
                                        <Badge count={(()=>{
                                            // 统计当前发货单中这个产品有多少总量了
                                            let sum = 0;
                                            let fsum = 0;
                                            this.props.things.forEach(_item => {
                                                if (_item.pname === item.name) {
                                                    sum += _item.pnumber;
                                                    fsum ++;
                                                }
                                            });
                                            return fsum === 0 ? 0 : '已有' + fsum + '工厂共发' + sum + '箱';
                                        })()}>
                                            <img className='ppic' src={'http://192.168.2.250:8922/productpics/' + item.pic} alt=''/>
                                        </Badge>
                                    </p>
                                    <p><b>{item.name}</b></p>
                                </div>)
                            }
                        </TabPane>)
                    }
                </Tabs>
                <Modal
                    visible={this.state.isShowModel}
                    title='从哪儿发货？'
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            isShowModel: false
                        });
                    }}
                    footer={null}
                >
                    <ModalInner nowItem={this.state.nowItem} ref="modalinner" close={()=>{
                        this.setState({
                            isShowModel: false
                        });
                    }} />
                </Modal>

                <h3>发货单预览</h3>
                <Radio.Group value={this.state.view} onChange={e=>{
                    this.setState({
                        view: e.target.value
                    });
                }}>
                    <Radio.Button value="以工厂透视">以工厂透视</Radio.Button>
                    <Radio.Button value="以产品透视">以产品透视</Radio.Button>
                </Radio.Group>
                {this.state.view === '以工厂透视' ? <Gcts /> : null}
                {this.state.view === '以产品透视' ? <Cpts /> : null}

                <Button onClick={()=>{
                    this.props.dispatch({'type': 'szss/FAHUO'});
                }}>发货</Button>
            </LR>
        );
    }
}
