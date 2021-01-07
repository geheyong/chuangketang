import React, { Component } from 'react'
import '../../src/style/courseInfo.less'

class CourseSection extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    // componentDidMount() {
    // }

    render() {
        return (
            <div className='courseSection'>
               <div className='clearfix'>
                    <h3><div className='courseName'>{this.props.info.course_name}</div></h3>
                    <div className='userName'>管理教师：{this.props.info.section_name}</div>
                </div>
            </div>
        )
    }
}

export default CourseSection
