import React, {Component} from 'react';
import {sortable} from 'react-sortable';
import {Icon} from 'antd';

@sortable
export default class OneSmall extends Component {
    render () {
        return (
            <div className='onesmall' {...this.props}>
                {this.props.chinese}
                <b
                    onClick={()=>{
                        this.props.other.deloneitem(this.props.english);
                    }}
                ><Icon type='close'/></b>
            </div>
        );
    }
}
