import React, { Component } from 'react'
import courseFace from '../style/img/bookFace.png'
import '../style/courseInfo.less'
import history from '../components/common/history'
import { Modal, message } from 'antd'
import { Model } from '../dataModule/testBone'
import store from '../store'

import { deleteCourseUrl } from '../dataModule/UrlList'

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
        history.push({ pathname: this.props.path, state: { course_uuid: this.props.info.uuid }})
    }

    showDeleteConfirm = () => {
        const me = this
        confirm({
            title: '您确定要删除此课程?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
            //   console.log(me.props.info.uuid)
              me.deleteCourse(me.props.info.uuid)
            }
          })
    }

    deleteCourse = (uuid) => {
        model.fetch(
            { 'course_id': uuid },
            deleteCourseUrl,
            'get',
            function(response) {
                if (response.execute_result === '删除成功') {
                    message.success('删除成功')
                    store.dispatch(commonAction.getsearchCourseInfo())
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
