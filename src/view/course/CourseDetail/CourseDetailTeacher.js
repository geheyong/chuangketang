import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageHeader } from 'antd'

import './style.less'

class CourseDetailTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props.location.state.course_uuid)
        return (
            <div className='wrapper'>
                <div className='name'>
                    <PageHeader className='row'
                        onBack={() => window.history.back()}
                    />
                    <div className='left'>课程详情</div>
                </div>
                <div className='link'></div>
                <div className='sxy'>11111</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, null)(CourseDetailTeacher)
