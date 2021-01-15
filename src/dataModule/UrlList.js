/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:37:58
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:46:26
 */
import request from './request'
// export const originalUrl = 'http://10.41.54.88:8000/api/'
export const originalUrl = 'http://10.41.7.235:8084/'
// export const originalUrl = 'http://192.168.1.111:8084/'

export const registerUrl = 'addUser/'
export const loginUrl = 'Login/'
export const outLogin = 'Logout/'

// export const courseInfoUrl = '/api/courseInfo.json'
export const courseInfoUrl = 'getAllCreatedCourse/' // 获得管理员/老师已经创建课程
export const createCourseUrl = 'addCourse/' // 管理员/老师创建课程
export const searchCourseUrl = 'getCreatedCourseDependName/' // 管理员/老师搜索课程
export const deleteCourseUrl = 'deleteCreatedCourse/' // 管理员/老师删除课程
export const getSectionUrl = 'getSection/' // 获得课程对应章节
export const addSectionUrl = 'addSection/' // 增加章节
export const updateSectionUrl = 'updateSection/' // 编辑章节
export const deleteSectionUrl = 'deleteSection/' // 删除章节
// export const courseSection = '/api/courseSection.json'
export const studentCourseInfoUrl = 'userRetrieveSelectedCourse/' // 获得学生对应的课程
export const studentSearchCourseUrl = 'userRetrieveAimedSelectedCourse/' // 学生搜索课程
export const studentDeleteCourseUrl = 'userDeleteCourse/' // 学生退出课程
export const studentSearchAddUrl = 'userRetrieveCourse/' // 学生添加课程框搜索
export const studentAddCourse = 'userSelectCourse/' // 学生添加课程

export const raiseQuestionUrl = 'studentRaiseQuestion/' // 学生提问接口
export const getCourseDependInfoUrl = 'getCourseDependCourseId/' // 根据课程id获取课程信息接口

export const upLoadUrl = 'http://10.41.7.235:8085/fileupload/' // 上传文件的url
export function getPPTElements(data) {
    return request({
        method: 'post',
        url: 'http://10.41.7.235:8000/read_ppt/',
        data
    })
}

