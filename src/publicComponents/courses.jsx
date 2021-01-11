import React, { Component } from 'react'
import courseFace from '../style/img/bookFace.png'
import '../style/courseInfo.less'
import history from '../components/common/history'
import { Modal, message } from 'antd'
import { Model } from '../dataModule/testBone'
import store from '../store'
import { actionCreators as commonAction } from '../components/common/store'

import { deleteCourseUrl, studentDeleteCourseUrl } from '../dataModule/UrlList'
import { getUserRoleId } from '../publicFunction/index'

const model = new Model()
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
        // console.log(this.props.info)
        history.push({ pathname: this.props.path, state: { course_uuid: this.props.info.course_id }})
    }

    showDeleteConfirm = () => {
        // const me = this
        confirm({
            title: '您确定要删除此课程?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // console.log(getUserRoleId())
            //   console.log(me.props.info.course_id)
            if (getUserRoleId() === 'e6bb794250d611ebb44a5254006e8f56') {
                console.log('学生')
                me.deleteCourse(me.props.info.course_id, studentDeleteCourseUrl, store.dispatch(commonAction.getStudentCourseInfo()))
            } else if (getUserRoleId() === 'a59a7bc650d611ebb44a5254006e8f56') {
                me.deleteCourse(me.props.info.course_id, deleteCourseUrl, store.dispatch(commonAction.getCourseInfo()))
                console.log('老师')
            }
            }
          })
    }

    deleteCourse = (uuid, url, f) => {
        model.fetch(
            { 'course_id': uuid },
            url,
            'post',
            function(response) {
                console.log(response)
                if (response.data.execute_result === '删除成功') {
                    message.success('删除成功')
                    f()
                    // store.dispatch(commonAction.getCourseInfo())
                } else {
                    message.error('删除失败')
                }
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
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
