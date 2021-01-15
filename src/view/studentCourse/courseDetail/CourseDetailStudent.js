import React, { Component } from 'react'
import { Fragment } from 'react'
import '../../../style/wrapper.less'
import './style.less'
import { connect } from 'react-redux'
import store from '../../../store'
import { actionCreators as commonAction } from '../../../components/common/store'
import history from '../../../components/common/history'

import { Tabs, PageHeader, Tree, Icon, Tooltip, Modal, Form, Input, message } from 'antd'
import { getUserUuid } from '../../../publicFunction/index'
import ShowQuestion from './poseQuestion.js'
import { raiseQuestionUrl, getCourseDependInfoUrl } from '../../../dataModule/UrlList'
import { Model } from '../../../dataModule/testBone'

const { TabPane } = Tabs
const { TreeNode } = Tree
const { TextArea } = Input
const model = new Model()
class CourseDetailStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
          confirmLoading: false,
          selectSectionId: '',
          questionVisible: false,
          question_title: '',
          question_content: '',
          receivePersonId: ''
        }
    }

    componentDidMount() {
      const course_uuid = this.props.location.state.course_uuid
      // console.log(this.props.location.state.course_uuid)
      store.dispatch(commonAction.getCourseSection(course_uuid))
      this.getReceivePersonId(course_uuid)
  }

  onSelect = (selectedKeys, info) => {
    if (info.selectedNodes.length !== 0) {
      // console.log(11, selectedKeys[0])
        this.setState({
            selectSectionId: selectedKeys[0]
        })
    } else {
        this.setState({
            selectSectionId: ''
        })
    }
  }

  showPPt = () => {
    setTimeout(() => {
      // console.log(22, this.state.selectSectionId)
      history.push({ pathname: '/app/watchPPt', state: { section_uuid: this.state.selectSectionId }})
    }, 0)
  }

  poseQuestion = () => {
    this.setState({
      questionVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      questionVisible: false
    })
  }

  onOk = () => {
    const { validateFields } = this.props.form
    const course_uuid = this.props.location.state.course_uuid
    validateFields()
    if (this.state.question_content === '' || this.state.question_title === '') return null
    const params = {
      course_id: course_uuid,
      raise_person_id: getUserUuid(),
      receive_person_id: this.state.receivePersonId,
      question_content: this.state.question_content,
      question_title: this.state.question_title
    }
    // console.log(params)
    this.setState({
      confirmLoading: true
    })
    this.submitQuestion(params)
  }

  submitQuestion = (params) => {
    const me = this
    model.fetch(
      params,
      raiseQuestionUrl,
      'post',
      function(response) {
        // console.log(response)
        me.setState({
          confirmLoading: false
        })
        if (response.data.execute_result === '提问成功') {
          message.success('提问成功')
          me.handleCancel()
        } else {
          message.error('提问失败')
          me.handleCancel()
        }
      },
      function() {
        console.log('发送问题失败')
        me.setState({
          confirmLoading: false
        })
      },
      false
    )
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getReceivePersonId = (uuid) => {
    const me = this
    model.fetch(
      { 'course_id': uuid },
      getCourseDependInfoUrl,
      'post',
      function(response) {
        // console.log(response.data.course.create_by)
        me.setState({
          receivePersonId: response.data.course.create_by
        })
      },
      function() {
        console.log('获取问题接受人请求失败')
      },
      false
    )
  }

    render() {
      const { courseSection } = this.props
      const { getFieldDecorator } = this.props.form
      const { confirmLoading } = this.state

      const formItemLayout = {
        labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
        },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
        }
      }

        return (
        <Fragment>
          <div className='wrapper'>
              <PageHeader className='rowStudent'
                    onBack={() => window.history.back()}
            />
              <Tabs type='card' className='tab'>
                <TabPane tab='课程目录' key='1'>
                <div className='catalog'>
                <div className='title'>目录</div>
                <div className='content'>
                    <Tree
                        className='tree'
                        switcherIcon={<Icon type='down' />}
                        defaultExpandAll
                        onSelect={this.onSelect}
                        blockNode='true'
                    >
                        { courseSection.length !== 0
                            ? courseSection.map((item, index) => {
                            return <TreeNode
                                    className='treeNode'
                                    title={(<span>
                                      {item.section_name}
                                      <Tooltip title='播放视频'>
                                        <Icon className='pic' type='play-circle' onClick={() => { console.log('看视频') }} />
                                      </Tooltip>
                                      <Tooltip title='查看ppt'>
                                        <Icon className='pic' type='file-ppt' onClick={ this.showPPt } />
                                      </Tooltip>
                                      <Tooltip title='练习题目'>
                                        <Icon className='pic' type='container' onClick={() => { console.log('做练习') }} />
                                      </Tooltip>
                                      <Tooltip title='提问'>
                                        <Icon type='question' className='pic' onClick={this.poseQuestion} />
                                      </Tooltip>
                                      </span>)}
                                    key={ item.uuid }
                                    >
                                  </TreeNode>
                            })
                            : null
                        }
                    </Tree>
                </div>
            </div>
                </TabPane>
                <TabPane tab='课程问题' key='2' className='tab2' >
                    <div className='border'>
                      <div className='link'></div>
                        <ShowQuestion/>
                    </div>
                </TabPane>
              </Tabs>
          </div>
          <Modal
              title='课程提问'
              visible={this.state.questionVisible}
              onOk={this.onOk}
              onCancel={this.handleCancel}
              destroyOnClose={ true }
              confirmLoading={confirmLoading}
              okText='提交'
            >
              <Form {...formItemLayout}>
                <Form.Item label='问题标题'>
                        {getFieldDecorator('question_title', {
                        rules: [
                            {
                            required: true,
                            message: '问题标题不能为空'
                            }
                        ]
                        })(<Input name='question_title' onChange={this.changeValue} />)}
                </Form.Item>
                <Form.Item label='问题内容'>
                        {getFieldDecorator('question_content', {
                        rules: [
                            {
                            required: true,
                            message: '问题内容不能为空'
                            }
                        ]
                        })(<TextArea name='question_content' onChange={this.changeValue} />)}
                </Form.Item>
              </Form>
            </Modal>
        </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    courseSection: state.get('commonReducer').get('courseSection').toJS()
  }
}

export default Form.create()(connect(mapStateToProps, null)(CourseDetailStudent))
