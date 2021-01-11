import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'

import '../../style/wrapper.less'
import './style/indexStyle.less'
import CourseInfo from '../../publicComponents/courses'

import { Button, Modal, Input, Table } from 'antd'
// import { Model } from '../../dataModule/testBone'
// import store from '../../store'
// import { actionCreators as commonAction } from '../../components/common/store'
// import { getUserUuid } from '../../publicFunction/index'
// import { createCourseUrl } from '../../dataModule/UrlList'

// const model = new Model()
const { Search } = Input
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
    }
    // {
    // title: '操作',
    // align: 'center',
    // width: 80,
    // render: (text, record, index) => {
    //   return [
    //     <Tooltip placement='top' title={'添加课程'}>
    //       <Icon type='plus' onClick={() => console.log('添加课程')}/>
    //     </Tooltip>
    //     ]
    //      }
// }
  ]
  const data = [
  ]
class StudentCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            courseName: '',
            inputValue: '',
            courseDetailTeacherPath: '/app/courseDetailStudent'
            // emptyText: '暂无数据'
        }
        this.searchInfo = this.searchInfo.bind(this)
        this.handleInputValue = this.handleInputValue.bind(this)
    }
    handleInputValue = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    searchInfo = () => {
        const value = this.state.inputValue
        console.log(value)
    }
    // componentDidMount() {
    // }
    handleCancel = e => {
        this.setState({
            visible: false
        })
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = () => {
    }

    render() {
        const { courses } = this.props
        const { courseDetailTeacherPath } = this.state

        return (
            <Fragment>
                <div className='wrapper'>
                    <div className='name'>
                        <div className='left'>我的课程</div>
                            <Search className='right'
                                placeholder='搜索课程'
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            >
                            </Search>&emsp;&emsp;
                            <Button className='right2' type='primary' icon='plus' onClick={this.showModal}>
                                添加课程
                            </Button>
                    </div>
                    <div className='link'></div>
                    { courses.length !== 0
                        ? courses.map((item, index) => {
                          return <CourseInfo key={index} info={item} path={ courseDetailTeacherPath } />
                        })
                        : null
                    }
                </div>
                    <Modal
                        title='添加新课程'
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        destroyOnClose={ true }
                        footer={null}
                        width='760px'
                    >
                        <div className='func' >
                            <div className='inputWrapper' style={{ marginLeft: 0 }}>
                                <div className='input'>教师:</div>
                                <Input
                                    style={{ width: '200px' }}
                                    value={ this.state.inputValue }
                                />
                            </div>
                            <div className='inputWrapper' >
                                <div className='input'>课程名称:</div>
                                <Input style={{ width: '200px' } }
                                // value = {this.state.inputValue}
                                onChange = {this.handleInputValue}
                             />
                            </div>
                            <div style={{ marginTop: '40px', marginLeft: '260px' }}>
                            &emsp;&emsp;
                                <Button type='primary' className='button' onClick={this.searchInfo }>搜索</Button>
                                <Button className='button' onClick={ this.handleReset }>重置</Button>
                            </div><br></br>
                            <div>
                            <Table columns={columns}
                            bordered={true}
                            pagination={false}
                            dataSource={data}
                            defaultExpandedRowKeys={1}
                            emptyText='暂无数据'/>
                            </div>
                        </div>
                    </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.get('commonReducer').get('courses').toJS()
    }
}

export default connect(mapStateToProps, null)(StudentCourse)
