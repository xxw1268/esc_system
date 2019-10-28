import React, {Component} from 'react';
import {Icon} from 'antd';

import './UpIdCard.less';

export default class UpIdCard extends Component {
    constructor () {
        super();
        this.state = {
            'base64': ''
        };
    }
    render () {
        return (
            <div className='upidcard_box' onClick={()=>{
                // 创建事件
                let evt = document.createEvent('MouseEvents');
                // 初始化事件,只有鼠标点击事件才会触发
                evt.initMouseEvent('click', false, false);
                // 发送事件
                this.refs.myfile.dispatchEvent(evt);
            }}
            style={{
                'border':'1px solid #ccc',
                'width':300,
                'height':230,
                'backgroundImage':'url(' + this.state.base64 + ')',
                'backgroundSize': 'cover',
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'center center'
            }}
            >
                <input type="file" ref="myfile" hidden onChange={()=>{
                    // 得到图片
                    let thepic = this.refs.myfile.files[0];
                    // 上传前预览
                    let fr = new FileReader();
                    // 读取图片,来自props的readAsDataURL方法
                    fr.readAsDataURL(thepic);
                    //改变base64的值,回调的e就是ProgressEvent
                    fr.onload = (e) => {
                        this.setState({
                            base64: e.target.result
                        });
                    };
                    if (this.props.getZm !== undefined){
                        this.props.getZm(thepic);
                    }
                    if (this.props.getFm !== undefined){
                        this.props.getFm(thepic);
                    }
                }}/>
                <Icon type="plus-circle" className='myicon'/>
            </div>
        );
    }
}
