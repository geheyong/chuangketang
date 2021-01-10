import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageHeader, Tree, Icon } from 'antd'

import './style.less'

const { TreeNode } = Tree
class CourseDetailTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info)
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
                <div>
                <div className='catalog'>
                    <div className='title'>目录</div>
                    <div className='content'>
                        <Tree
                            className='tree'
                            switcherIcon={<Icon type='down' />}
                            defaultExpandAll
                            onSelect={this.onSelect}
                        >
                            <TreeNode title='parent 1' key='0-0'>
                                <TreeNode title='parent 1-0' key='0-0-0'></TreeNode>
                            </TreeNode>
                            <TreeNode title='parent 2' key='0-1'>
                                <TreeNode title='parent 2-0' key='0-1-0'></TreeNode>
                            </TreeNode>
                        </Tree>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, null)(CourseDetailTeacher)
