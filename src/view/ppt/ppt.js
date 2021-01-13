import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Model } from '../../dataModule/testBone'
import './style.less'

class PPT extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
      const { data } = this.props
      if (data === undefined || data === null) return null

    return (
      <div >
          <div className='ppt' style={{ width: data.width / 10000, height: data.height / 10000 }}>
              111
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(PPT)
