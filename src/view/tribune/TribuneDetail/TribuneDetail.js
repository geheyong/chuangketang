import React, { Component } from 'react'
import { Fragment } from 'react'

import '../../../style/wrapper.less'
import courseFace from '../../../style/img/bookFace.png'

import { Button, Select, Modal, Input, PageHeader } from 'antd'

class TribuneDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            course_name: 'python课程',
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
                    <PageHeader className='row'
                     onBack={() => window.history.back()}
                     />
                      <div className='left'>{ this.state.course_name + '论坛' }</div>
                        {/* <div className='left'>python程序设计论坛</div> */}
                        </div>
                        <div className='link_left'></div><br></br>
                            <Select className='tribune_right'
                                // value={this.state.value}
                                placeholder={'搜索帖子'}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.handleSearch}
                                onChange={this.handleChange}
                                notFoundContent={null}
                            >
                            </Select>&emsp;&emsp;
                            <Button type='primary' icon='plus' onClick={this.showModal}>
                                发起讨论
                            </Button><br></br><br></br>
                    <div className='link'></div>
                    <br></br>
                    <div className='courseInfo'>
                        <img className='courseFace' alt='课程封面' src={courseFace} ></img>
                    </div>

                    <Modal
                        title='输入讨论标题'
                        visible={this.state.visible}
                        footer={[
                            <Button key='back' onClick={this.handleCancel}>
                              取消
                            </Button>,
                            <Button key='submit' type='primary' onClick={this.handleOk}>
                              确定
                                </Button>]}
                     >
                            <Input
                                style={ { width: 300 } }
                                placeholder='讨论标题'
                                // value={introduction}
                                onChange={ (e) => this.setState({ introduction: e.target.value }) }
                            /><br></br><br></br>
                             <div className='link'></div><br></br>
                            <Input
                                style={ { width: 450, height: 200 } }
                                placeholder='请输入讨论内容'
                                // value={introduction}
                                onChange={ (e) => this.setState({ introduction: e.target.value }) }
                            />
                    </Modal>
                </div>
            </Fragment>
        )
    }
}

export default TribuneDetail
