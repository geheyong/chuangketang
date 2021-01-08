import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'

import '../../style/wrapper.less'
import CourseInfo from '../../publicComponents/courses'

import { Button, Select, Modal, Input, message } from 'antd'
import { Model } from '../../dataModule/testBone'
import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store'
import { getUserUuid } from '../../publicFunction/index'
import { createCourseUrl } from '../../dataModule/UrlList'

const model = new Model()
class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            courseName: '',
            courseDetailTeacherPath: '/app/courseDetailTeacher'
        }
    }

    // componentDidMount() {
    // }

    handleSearch = value => {
        if (value) {
          fetch(value, data => this.setState({ data }))
        } else {
          this.setState({ data: [] })
        }
    }

    handleChange = value => {
        this.setState({ value })
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false
        })
    }

    handleOk = () => {
        const me = this
        model.fetch(
            { 'course_name': me.state.courseName, 'create_by': getUserUuid() },
            createCourseUrl,
            'post',
            function(response) {
                // console.log(response)
                if (response.data.execute_result === '创建成功') {
                    message.success('创建成功')
                    store.dispatch(commonAction.getCourseInfo())
                    me.handleCancel()
                }
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
    }

    render() {
        const { courses } = this.props
        const { courseDetailTeacherPath } = this.state
        return (
            <Fragment>
                <div className='wrapper'>
                    <div className='name'>
                        <div className='left'>我的课程</div>
                            <Select className='right'
                                // value={this.state.value}
                                placeholder={'搜索课程'}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.handleSearch}
                                onChange={this.handleChange}
                                notFoundContent={null}
                            >
                                {/* { courses } */}
                            </Select>&emsp;&emsp;
                            <Button className='right2' type='primary' icon='plus' onClick={this.showModal}>
                                创建课程
                            </Button>
                    </div>
                    <div className='link'></div>
                    { courses.length !== 0
                        ? courses.map((item, index) => {
                          return <CourseInfo key={index} info={item} path={ courseDetailTeacherPath } />
                        })
                        : null
                    }
                    <Modal
                        title='创建新课程'
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        destroyOnClose={ true }
                     >
                        <div>课程名称：
                            <Input
                                style={ { width: 300 } }
                                placeholder='课程名称'
                                onChange={ (e) => this.setState({ courseName: e.target.value }) }
                            />
                        </div>
                    </Modal>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.get('commonReducer').get('courses').toJS()
    }
}

export default connect(mapStateToProps, null)(Course)
