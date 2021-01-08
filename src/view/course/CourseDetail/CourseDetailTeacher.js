import React, { Component } from 'react'
import { connect } from 'react-redux'

class CourseDetailTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props.location.state.course_uuid)
        return (
            <div style={{ overflowX: 'auto', marginTop: 60 }}>课程详情{this.props.location.state.course_uuid} </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, null)(CourseDetailTeacher)
