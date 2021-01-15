import React, { Component, Fragment } from 'react'
// import { connect } from 'react-redux'
import '../../../style/wrapper.less'
// import CourseInfo from '../../publicComponents/courses'

import { Modal, Input } from 'antd'
// import { Model } from '../../dataModule/testBone'
// import store from '../../store'
// import { actionCreators as commonAction } from '../../components/common/store'

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            courseName: '',
            inputValueCouse: '',
            InputValueTeacher: '',
            exercise_content: '你会吗？'
        }
    }
render() {
    return (
        <Fragment>
            <div className='wrapper'>
                <div className='name'>
                    <div className='left'>答疑列表</div>
                </div>
                <div className='link'></div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={ true }
                 >
                     <div>
                         <div> 题目:</div>
                         <Modal>
                         </Modal>
                     </div>
                     <br></br>
                     <div className='link'></div>
                     <br></br>
                        <div>
                        <div>提出的问题：</div>
                        <Modal>
                         </Modal>
                         </div>
                        <br></br>
                             <Input
                            style={ { width: 400, height: 150 } }
                            placeholder='输入回复内容'
                            onChange={ (e) => this.setState({ courseName: e.target.value }) }
                        />
                </Modal>
            </div>
        </Fragment>
        )
     }
}

export default Question
