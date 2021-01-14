import React, { Component } from 'react'
import { Fragment } from 'react'
import '../../../style/wrapper.less'
import './style.less'
import { connect } from 'react-redux'
import store from '../../../store'
import { actionCreators as commonAction } from '../../../components/common/store'
import history from '../../../components/common/history'

import { Tabs, PageHeader, Tree, Icon, Tooltip } from 'antd'

const { TabPane } = Tabs
const { TreeNode } = Tree
class CourseDetailStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
          selectSectionId: ''
        }
    }

    componentDidMount() {
      const course_uuid = this.props.location.state.course_uuid
      // console.log(this.props.location.state.course_uuid)
      store.dispatch(commonAction.getCourseSection(course_uuid))
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

    render() {
      const { courseSection } = this.props

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
                <TabPane tab='提出问题' key='2'>
                  <p>Content of Tab Pane 2</p>
                </TabPane>
              </Tabs>
          </div>
        </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    courseSection: state.get('commonReducer').get('courseSection').toJS()
  }
}

export default connect(mapStateToProps, null)(CourseDetailStudent)
