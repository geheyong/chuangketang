import React, { Component } from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import '../../style/wrapper.less'
// import history from '../../components/common/history'
import CourseInfo from '../../publicComponents/courses'

class Tribune extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            course_name: '',
            // introduction: '',
            data: [],
            value: undefined
        }
    }

    // componentDidMount() {

    // }

    handleSearch = value => {
        if (value) {
          fetch(value, data => this.setState({ data }))
        } else {
          this.setState({ data: [] })
        }
    }

    handleChange = value => {
        this.setState({ value })
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false
        })
    }

    render() {
        const { courses } = this.props
        return (
            <Fragment>
                <div className='wrapper'>
                    <div className='name'>
                        <div className='left'>课程论坛</div>
                        </div>
                    <div className='link'></div>
                        <a href='/app/tribune/tribune_detail'>
                        {
                        courses.map((item, index) => {
                          return <CourseInfo key={index} info={item}/>
                        })
                    }
                        </a>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        courses: state.get('commonReducer').get('courses').toJS()
    }
}
export default connect(mapStateToProps, null)(Tribune)
