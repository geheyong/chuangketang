import React, { Component } from 'react'
import courseFace from '../style/img/bookFace.png'
import '../style/courseInfo.less'

class CourseInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    // componentDidMount() {
    // }

    render() {
        return (
            <div className='courseInfo'>
                <img className='courseFace' alt='课程封面' src={courseFace} ></img>
                <div className='clearfix'>
                    <h3><div className='courseName'>{this.props.info.course_name}</div></h3>
                    <div className='userName'>管理教师：{this.props.info.user_name}</div>
                </div>
            </div>
        )
    }
}

export default CourseInfo
