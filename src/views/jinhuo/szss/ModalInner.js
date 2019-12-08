import React, {Component} from 'react';
import {Input, Button} from 'antd';
import {connect} from 'dva';

@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class ModalInner extends Component {
    constructor (props) {
        super();
        let obj = {};
        for (let i = 0; i < props.things.length; i++){
            if (props.things[i].pname === props.nowItem.name) {
                obj[props.things[i].pfactory] = Number(props.things[i].pnumber);
            }
        }
        this.state = obj;
    }
    render () {
        return (
            <div>
                生产{this.props.nowItem.name}的工厂有：
                <div>
                    {
                        this.props.nowItem.factory.map(f => {
                            return <div className="ff" key={f}>
                                {f}工厂，您要进货：<Input value={this.state[f]} onChange={e=>{
                                    this.setState({
                                        [f]: Number(e.target.value)
                                    });
                                }}/>
                            </div>;
                        })
                    }
                </div>
                <div style={{'height': '30px', 'paddingTop': '10px'}}>
                    <Button style={{'float': 'right'}} onClick={()=>{
                        // 组件things数组
                        let things = [];
                        // 遍历子组件的这个state
                        for (let k in this.state) {
                            things.push({'pname': this.props.nowItem.name, 'pfactory': k, 'pnumber': this.state[k], 'pprice': this.props.nowItem.price});
                        }
                        this.props.dispatch({'type': 'szss/CHANGETHINGS', things});
                        this.props.close();
                    }} type="primary">确定</Button>
                    {' '}
                    <Button style={{'float': 'right', 'marginRight': '10px'}} onClick={()=>{
                        this.props.close();
                    }}>取消</Button>
                </div>
            </div>
        );
    }
}
