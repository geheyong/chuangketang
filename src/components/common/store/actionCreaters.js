import { Model } from '../../../dataModule/testBone'
import { courseInfoUrl, courseSection } from '../../../dataModule/UrlList'
import * as constants from './constants'

// import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
import { fromJS } from 'immutable'

const model = new Model()
export const dispatchBreadcrumbList = (data) => ({
  type: constants.breadcrumbList,
  data: fromJS(data)
})

export const getAllBillTypes = () => {
  // model.fetch(
  //   { creater: 'c6825ed3afa9411694b62e61119544ed' },
  //   billTypes,
  //   'POST',
  //   function(response) {
  //     console.log(response)
  //   },
  //   // eslint-disable-next-line handle-callback-err
  //   function(error) {
  //     return
  //   },
  //   false
  // )
}

// 获得角色所属的课程信息
const courseInfo = (result) => ({
  type: constants.courseInfo,
  data: result
})

export const getCourseInfo = () => {
   return (dispatch) => {
    model.fetch(
      { },
      courseInfoUrl,
      'get',
      function(response) {
        const result = response.data.data
        dispatch(courseInfo(result))
      },
      function() {
        console.log('error')
      },
      true
    )
   }
}

// 获得角色搜索课程信息
// const searchCourseInfo = (result) => ({
//   type: constants.searchCourseInfo,
//   data: result
// })

// const courseSection = (result) => ({
//   type: constants.courseSection,
//   data: result
// })

export const getCourseSection = () => {
  return (dispatch) => {
   model.fetch(
     { },
     courseSectionUrl,
     'get',
     function(response) {
       const result = response.data.data
       dispatch(courseSection(result))
     },
     function() {
       console.log('error')
     },
     true
   )
  }
}
