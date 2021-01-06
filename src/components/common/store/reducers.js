import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'
import Course from '../../../view/course/index'

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
      routerDom: <Route key={'/app/tribune'} exact path={'/app/tribune'} component={ (props) => <Index { ...props }/> } />,
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
  courseInfo: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    case constants.courseInfo:
      return state.set('courseInfo', fromJS(action.data))
    default:
      return state
  }
}
