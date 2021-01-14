import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Model } from '../../dataModule/testBone'
import { Upload, message, Button, Icon } from 'antd'

class UpLoad extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const props = {
        name: 'file',
        action: 'http://10.41.7.235:8085/upload/',
        headers: {
            authorization: 'authorization-text'
        },
        data: { 'uuid': '0000' },
        accept: '.pptx',
        onChange(info) {
            if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`)
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`)
            }
        }
    }

    return (
      <div style={{ overflowX: 'auto', marginTop: 60 }}>
        <Upload {...props}>
            <Button>
            <Icon type='upload' /> Click to Upload
            </Button>
        </Upload>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(UpLoad)
