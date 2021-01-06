import React, { Component } from 'react'
import { Fragment } from 'react'

import '../../style/wrapper.less'
import courseFace from '../../style/img/bookFace.png'

import { Button, Select, Modal, Input } from 'antd'

const { TextArea } = Input
class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            course_name: '',
            // introduction: '',
            chapter: {},
            current_chapter: 0,
            data: [],
            value: undefined
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
        // console.log(e);
        this.setState({
            visible: false
        })
    }

    render() {
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
                            </Select>&emsp;&emsp;
                            <Button type='primary' icon='plus' onClick={this.showModal}>
                                创建课程
                            </Button>
                        </div>
                    <div className='link'></div>
                    <div className='courseInfo'>
                        <img className='courseFace' alt='课程封面' src={courseFace} ></img>
                    </div>

                    <Modal
                        title='申请新课程'
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                     >
                        <div>课程名称：
                            <Input
                                style={ { width: 300 } }
                                placeholder='课程名称'
                                // value={introduction}
                                onChange={ (e) => this.setState({ introduction: e.target.value }) }
                            />
                        </div>
                        <div style={ { marginTop: 10 } }><div style={ { float: 'left' } }>课程简称：</div>
                            <TextArea
                                rows={4}
                                placeholder='课程简称'
                                style={ { width: 300 } }
                                // value={course_name}
                                onChange={ (e) => this.setState({ course_name: e.target.value }) }
                            />
                        </div>
                    </Modal>
                </div>
            </Fragment>
        )
    }
}

export default Course
