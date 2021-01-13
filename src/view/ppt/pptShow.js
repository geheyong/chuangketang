import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Model } from '../../dataModule/testBone'
import PPT from './ppt'

const model = new Model()
class PPTShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.getPPt()
  }

  getPPt = () => {
    const me = this
    model.fetch(
      {},
      // 'api/type.json',
      'api/ppt_json.json',
      'get',
      function(response) {
        console.log(response.data)
        me.setState({
          data: response.data
        })
      },
      function() {
        console.log('error')
      },
      true
    )
  }

  render() {
    const { data } = this.state
    return (
      <div style={{ overflowX: 'auto', marginTop: 60 }}>
        <PPT data={data} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(PPTShow)
