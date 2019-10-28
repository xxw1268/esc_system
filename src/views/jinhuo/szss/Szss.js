import React, {Component} from 'react';
import {Tabs, Badge, Modal, Input} from 'antd';
import {connect} from 'dva';

import LR from '../../../layouts/LR.js';
import ModalInner from './ModalInner.js';
import './Szss.less';

const {TabPane} = Tabs;

@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class Szss extends Component {
    constructor (props) {
        super(props);
        this.state = {
            keyword:'',
            isShowModel:true,
            nowItem: {'name': '混合装果仁干果', 'pic':'l7lwq17efk.png', 'factory': ['A', 'B'], 'price': 559}
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'szss/LOADPRODUCTS'});
    }
    sosuoCount (typeName){
        if (this.state.keyword === '') return 0;
        return this.props.products[typeName].reduce((a, b)=>{
            if (b.name.includes(this.state.keyword)) return a + 1;
            return a;
        }, 0);
    }
    render () {
        return (
            <LR>
                <Input value={this.state.keyword} onChange={e=>{
                    this.setState({
                        keyword: e.target.value
                    });
                }} />
                <Tabs defaultActiveKey='1'>
                    {
                        Object.keys(this.props.products).map(typeName=><TabPane
                            key={typeName}
                            tab={
                                <Badge count={this.sosuoCount(typeName)}>{typeName}</Badge>
                            }
                        >
                            {
                                this.props.products[typeName].filter(item=> item.name.includes(this.state.keyword)).map(item=><div
                                    key={item.name}
                                    className='ge'
                                    onClick={()=>{
                                        this.setState({
                                            isShowModel:true,
                                            nowItem:item
                                        });
                                    }}
                                >
                                    <p>
                                        <img src={'http://192.168.2.250:8922/productpics/' + item.pic} alt=""/>
                                    </p>
                                    <p>
                                        {item.name}
                                    </p>
                                </div>)
                            }
                        </TabPane>
                        )
                    }
                </Tabs>
                <Modal
                    title='请选择发货地'
                    visible={this.state.isShowModel}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            isShowModel:false
                        });
                    }}
                >
                    <ModalInner nowItem={this.state.nowItem}/>
                </Modal>
            </LR>
        );
    }
}
