import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'
import Course from '../../../view/course/index'
import StudentCourse from '../../../view/studentCourse/index'
// import TribuneDetail from '../../../view/tribune/TribuneDetail/TribuneDetail'
import Tribune from '../../../view/tribune/index'
import Index from '../../index'
import * as constants from './constants'

const defaultState = fromJS({
  routersReady: false,
  userBillType: [],
  routers: [
    {
      routerDom: <Route key={'/app/course'} exact path={'/app/course'} component={ (props) => <Course { ...props }/> } />,
      link: '/app/course',
      title: '我的课程',
      key: '/app/course',
      child: []
    }, {
      routerDom: <Route key={'/app/studentCourse'} exact path={'/app/studentCourse'} component={ (props) => <StudentCourse { ...props }/> } />,
      link: '/app/studentCourse',
      title: '我的课程（学生）',
      key: '/app/studentCourse',
      child: []
    }, {
      routerDom: <Route key={'/app/tribune'} exact path={'/app/tribune'} component={ (props) => <Tribune { ...props }/> } />,
      link: '/app/tribune',
      title: '论坛',
      key: '/app/tribune',
      child: []
    }, {
      routerDom: <Route key={'/app/answerQuestion'} exact path={'/app/answerQuestion'} component={ (props) => <Index { ...props }/> } />,
      link: '/app/answerQuestion',
      title: '我的答疑',
      key: '/app/answerQuestion',
      child: []
    }, {
      routerDom: <Route key={'/app/myQuestion'} exact path={'/app/myQuestion'} component={ (props) => <Index { ...props }/> } />,
      link: '/app/myQuestion',
      title: '我的问题',
      key: '/app/myQuestion',
      child: []
    }
  ],
  courses: [],
  courseSection: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    case constants.courseInfo:
      return state.set('courses', fromJS(action.data))
    case constants.searchCourseInfo:
      return state.set('courses', fromJS(action.data))
    case constants.courseSection:
      return state.set('courseSection', fromJS(action.data))
    default:
      return state
  }
}
