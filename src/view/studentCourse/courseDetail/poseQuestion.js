import React, { Component } from 'react'
import { Button } from 'antd'

import './poseQuestion.less'
import photograph from '../../../style/img/bookFace.png'

class ShowQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className='question_unit'>
                <img className='img' src={ photograph } alt={ '课程封面' }/>
                <div className='text-area'>
                    <div className='content'>
                        <div>问题标题：</div>
                        <div className='text'>问题内容：</div>
                        <div className='text'>教师回复：</div>
                    </div>
                </div>
                <div className='control'>
                        <div className='raise_person'>提问人：XXXX</div>
                        <Button type='primary' className='seebutton' >查看</Button>
                </div>
            </div>
        )
    }
}

export default ShowQuestion
