import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Model } from '../../dataModule/testBone'
import './style.less'

class PPT extends Component {
  constructor(props) {
    super(props)
    this.state = {
        page: '1'
    }
  }

  render() {
    const { data } = this.props
    const { page } = this.state
    if (data.elements === undefined || data.elements === null) return null
    // const width = data.width
    // const height = data.height
    console.log(data.elements[page - 1])
    // const pageInfo = data.elements[page - 1]
    
    return (
      <div >
          <div className='ppt' style={{ width: 915, height: 686 }}>
            {/* {
                pageInfo.map((item, index) => {
                    item.type === "text" ?
                    1 : 0
                })
            } */}
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
