import { Model } from '../../../dataModule/testBone'
import { courseInfoUrl } from '../../../dataModule/UrlList'
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
        console.log('success')
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

