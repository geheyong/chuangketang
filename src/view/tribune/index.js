import React, { Component } from 'react'
import { Fragment } from 'react'
import '../../style/wrapper.less'
import courseFace from '../../style/img/bookFace.png'

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
        return (
            <Fragment>
                <div className='wrapper'>
                    <div className='name'>
                        <div className='left'>课程论坛</div>
                        </div>
                    <div className='link'></div>
                    <div className='courseInfo'>
                        <a href='/tribune/tribune_detail'>
                        <img className='courseFace' alt='课程封面' src={courseFace } ></img>
                        </a>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Tribune
