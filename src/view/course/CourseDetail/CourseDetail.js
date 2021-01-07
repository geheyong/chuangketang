import React, { Component } from 'react'
import { Fragment } from 'react'
import '../../../style/wrapper.less'
import CourseSection from '../../../publicComponents/courseSection'
import { connect } from 'react-redux'

import { Tabs } from 'antd'
import { courseSection } from '../../../dataModule/UrlList'

const { TabPane } = Tabs
class CourseDetail extends Component {
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
        render() {
            return (
            <Fragment>
              <div className='wrapper'>
             <Tabs type='card'>
              <TabPane tab='课程目录' key='1'>
              <p>{
                        courseSection.map((item, index) => {
                          return <CourseSection key={index} info={item} />
                        })
                    }
                </p>
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
export default connect(mapStateToProps, null)(CourseDetail)
