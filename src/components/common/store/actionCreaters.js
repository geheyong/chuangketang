import { Model } from '../../../dataModule/testBone'
import { courseInfoUrl, searchCourseUrl, getSectionUrl, studentCourseInfoUrl, studentSearchCourseUrl } from '../../../dataModule/UrlList'
import * as constants from './constants'

// import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
import { fromJS } from 'immutable'
import { getUserUuid } from '../../../publicFunction/index'

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

// 获得管理员/老师所属的课程信息
const courseInfo = (result) => ({
  type: constants.courseInfo,
  data: result
})

export const getCourseInfo = () => {
   return (dispatch) => {
    model.fetch(
      { 'user_id': getUserUuid() },
      courseInfoUrl,
      'post',
      function(response) {
        const result = response.data
        dispatch(courseInfo(result))
      },
      function() {
        console.log('error')
      },
      false
    )
   }
}

// 获得学生对应的课程信息
const studentCourseInfo = (result) => ({
  type: constants.studentCourseInfo,
  data: result
})

export const getStudentCourseInfo = () => {
  return (dispatch) => {
    model.fetch(
      { 'user_id': getUserUuid() },
      studentCourseInfoUrl,
      'post',
      function(response) {
        const result = response.data
        dispatch(studentCourseInfo(result))
      },
      function() {
        console.log('error')
      },
      false
    )
   }
}

// 获得学生搜索课程信息
const studentSearchCourseInfo = (result) => ({
  type: constants.studentSearchCourseInfo,
  data: result
})

export const getStudentSearchCourseInfo = (name) => {
  return (dispatch) => {
    model.fetch(
      { 'course_name': name, 'user_id': getUserUuid() },
      studentSearchCourseUrl,
      'post',
      function(response) {
        const result = response.data
        dispatch(studentSearchCourseInfo(result))
       // console.log(result)
      },
      function() {
        console.log('error')
      },
      false
    )
   }
}

// 获得管理员/老师搜索课程信息
const searchCourseInfo = (result) => ({
  type: constants.searchCourseInfo,
  data: result
})

export const getsearchCourseInfo = (name) => {
  return (dispatch) => {
    model.fetch(
      { 'course_name': name, 'user_id': getUserUuid() },
     searchCourseUrl,
     'post',
     function(response) {
       const result = response.data
      //  console.log(result)
       dispatch(searchCourseInfo(result))
     },
     function() {
       console.log('error')
     },
     false
    )
  }
}

// 获得课程对应章节
const courseSection = (result) => ({
  type: constants.courseSection,
  data: result
})

export const getCourseSection = (uuid) => {
  return (dispatch) => {
   model.fetch(
     { 'course_id': uuid },
     getSectionUrl,
     'post',
     function(response) {
       const result = response.data.result
      //  console.log(result)
       dispatch(courseSection(result))
     },
     function() {
       console.log('error')
     },
     false
   )
  }
}
