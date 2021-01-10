import React, { Component } from 'react'
import courseFace from '../style/img/bookFace.png'
import '../style/courseInfo.less'
import history from '../components/common/history'
import { Modal } from 'antd'

const { confirm } = Modal
class CourseInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    // componentDidMount() {
    // }

    handleClick = () => {
        history.push({ pathname: this.props.path, state: { course_uuid: this.props.info.uuid }})
    }

    showDeleteConfirm = () => {
        confirm({
            title: '您确定要删除此课程?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              console.log('OK')
            }
          })
    }

    render() {
        return (
            <div className='courseInfo'>
                <img className='courseFace' alt='课程封面' src={courseFace} onClick={ this.handleClick } ></img>
                <div className='clearfix'>
                    <h3><div className='courseName' onClick={ this.handleClick } >{this.props.info.course_name}</div></h3>
                    <div className='userName'>管理教师：{this.props.info.user_name}</div>
                    <div className='delete' onClick={ this.showDeleteConfirm }>删除课程</div>
                </div>
            </div>

        )
    }
}

export default CourseInfo
