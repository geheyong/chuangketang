import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'

import '../../style/wrapper.less'
import './style/indexStyle.less'
import CourseInfo from '../../publicComponents/courses'

import { Button, Modal, Input, Table, Tooltip, Icon, message } from 'antd'
import { Model } from '../../dataModule/testBone'
import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store'
import { getUserUuid } from '../../publicFunction/index'
import { studentSearchAddUrl, studentAddCourse } from '../../dataModule/UrlList'

const model = new Model()
const { Search } = Input

class StudentCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            courseName: '',
            inputValueCouse: '',
            InputValueTeacher: '',
            courseDetailStudentPath: '/app/courseDetailStudent',
            // emptyText: '暂无数据'
            data: []
        }
    }
    handleInputValueCourse = (e) => {
        this.setState({
            inputValueCouse: e.target.value
        })
    }

    handleInputValueTeacher = (e) => {
        this.setState({
            InputValueTeacher: e.target.value
        })
    }

    addStudentCourse = (record) => {
        console.log(record)
        model.fetch(
            { 'course_id': record.course_id, 'user_id': getUserUuid() },
            studentAddCourse,
            'post',
            function(response) {
                console.log(response)
                if (response.data.execute_result === '已选择此课程') {
                    message.warning('已选择此课程')
                } else if (response.data.execute_result === '选课失败') {
                    message.error('选课失败')
                } else {
                    message.success('选课成功')
                    store.dispatch(commonAction.getStudentCourseInfo())
                }
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
    }

    searchInfo = () => {
        const me = this
        const { inputValueCouse, InputValueTeacher } = this.state
        model.fetch(
            { 'user_name': InputValueTeacher, 'course_name': inputValueCouse },
            studentSearchAddUrl,
            'post',
            function(response) {
                console.log(response.data)
                me.setState({
                    data: response.data
                })
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
    }

    // componentDidMount() {
    // }

    handleCancel = e => {
        this.setState({
            visible: false
        })
    }

    searchCourse = (courseName) => {
        // console.log('courseName', courseName)
        store.dispatch(commonAction.getStudentSearchCourseInfo(courseName))
    }

    clearNull = (event) => {
        // console.log(event.target.value)
        if (event.target.value == null || event.target.value === '') {
            console.log('触发清空')
            store.dispatch(commonAction.getStudentCourseInfo())
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleReset = () => {
        this.setState({
            inputValueCouse: '',
            InputValueTeacher: '',
            data: []
        })
    }

    // handleOk = () => {
    //     const me = this
    //     model.fetch(
    //         { 'course_name': me.state.courseName, 'create_by': getUserUuid() },
    //         createCourseUrl,
    //         'post',
    //         function(response) {
    //             // console.log(response)
    //             if (response.data.execute_result === '创建成功') {
    //                 message.success('创建成功')
    //                 store.dispatch(commonAction.getCourseInfo())
    //                 me.handleCancel()
    //             }
    //         },
    //         function() {
    //             message.error('连接失败，请重试!')
    //         },
    //         false
    //     )
    // }

    render() {
        const { studentCourses } = this.props
        const { courseDetailStudentPath, inputValueCouse, InputValueTeacher, data } = this.state
        const tableData = []
        if (data !== undefined) {
            data.map((item, index) => {
                tableData.push({
                    course_name: item.course_name,
                    user_name: item.user_name,
                    key: index,
                    course_id: item.course_id
                })
                return null
            })
        }

        const columns = [
            {
              title: '课程名称',
              dataIndex: 'course_name',
              key: 'course_name'
            },
            {
              title: '管理教师',
              dataIndex: 'user_name',
              key: 'user_name'
            },
            {
            title: '操作',
            align: 'center',
            width: 80,
            render: (text, record, index) => {
              return [
                <Tooltip placement='top' title={'添加课程'} key= {index}>
                  <Icon type='plus' onClick={() => this.addStudentCourse(record)}/>
                </Tooltip>
                ]
                 }
            }
        ]

        return (
            <Fragment>
                <div className='wrapper'>
                    <div className='name'>
                        <div className='left'>我的课程</div>
                            <Search className='right'
                                placeholder='搜索课程'
                                onSearch={value => this.searchCourse(value)}
                                allowClear
                                style={{ width: 200 }}
                                onChange={(event) => this.clearNull(event)}
                            >
                            </Search>&emsp;&emsp;
                            <Button className='right2' type='primary' icon='plus' onClick={this.showModal}>
                                添加课程
                            </Button>
                    </div>
                    <div className='link'></div>
                    { studentCourses.length !== 0
                        ? studentCourses.map((item, index) => {
                          return <CourseInfo key={index} info={item} path={ courseDetailStudentPath } />
                        })
                        : null
                    }
                </div>
                    <Modal
                        title='添加新课程'
                        visible={this.state.visible}
                        destroyOnClose={ true }
                        onCancel={this.handleCancel}
                        footer={null}
                        width='760px'
                    >
                        <div className='func' >
                            <div className='inputWrapper' style={{ marginLeft: 0 }}>
                                <div className='input'>教师:</div>
                                <Input
                                    style={{ width: '200px' }}
                                    value= {InputValueTeacher}
                                    onChange = {this.handleInputValueTeacher}
                                />
                            </div>
                            <div className='inputWrapper' >
                                <div className='input'>课程名称:</div>
                                <Input style={{ width: '200px' } }
                                value = {inputValueCouse}
                                onChange = {this.handleInputValueCourse}
                             />
                            </div>
                            <div style={{ marginTop: '40px', marginLeft: '260px' }}>
                            &emsp;&emsp;
                                <Button type='primary' className='button' onClick={this.searchInfo }>搜索</Button>
                                <Button className='button' onClick={ this.handleReset }>重置</Button>
                            </div><br></br>
                            <div>
                            <Table
                                columns={columns}
                                bordered={true}
                                pagination={false}
                                dataSource={tableData}
                                emptyText='暂无数据'
                            />
                            </div>
                        </div>
                    </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        studentCourses: state.get('commonReducer').get('studentCourses').toJS()
    }
}

export default connect(mapStateToProps, null)(StudentCourse)
