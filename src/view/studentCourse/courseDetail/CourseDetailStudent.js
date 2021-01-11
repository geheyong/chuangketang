import React, { Component } from 'react'
import { Fragment } from 'react'
import '../../../style/wrapper.less'
import './style.less'
import { connect } from 'react-redux'
import store from '../../../store'
import { actionCreators as commonAction } from '../../../components/common/store'

import { Tabs, PageHeader, Tree, Icon } from 'antd'

const { TabPane } = Tabs
const { TreeNode } = Tree
class CourseDetailStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            course_name: '',
            section_name: '',
            // introduction: '',
            chapter: {},
            current_chapter: 0,
            data: [],
            value: undefined
        }
    }

    componentDidMount() {
      const course_uuid = this.props.location.state.course_uuid
      // console.log(this.props.location.state.course_uuid)
      store.dispatch(commonAction.getCourseSection(course_uuid))
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
                    >
                        { courseSection.length !== 0
                            ? courseSection.map((item, index) => {
                            return <TreeNode title={ item.section_name } key={ item.uuid }></TreeNode>
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
