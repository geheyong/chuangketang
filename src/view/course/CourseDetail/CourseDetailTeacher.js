import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageHeader, Tree, Icon, Button, Modal, Input, message } from 'antd'
import store from '../../../store'
import { Model } from '../../../dataModule/testBone'
import { actionCreators as commonAction } from '../../../components/common/store'
import { addSectionUrl, updateSectionUrl, deleteSectionUrl } from '../../../dataModule/UrlList'

import './style.less'
import { getUserUuid } from '../../../publicFunction'

const model = new Model()
const { TreeNode } = Tree
const { confirm } = Modal
class CourseDetailTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            editVisible: false,
            section_name: '',
            selectSection: '',
            selectSectionId: ''
        }
    }

    componentDidMount() {
        const course_uuid = this.props.location.state.course_uuid
        // console.log(this.props.location.state.course_uuid)
        store.dispatch(commonAction.getCourseSection(course_uuid))
    }

    onSelect = (selectedKeys, info) => {
        // console.log('selected', selectedKeys, info)
        // console.log(info.selectedNodes[0].props.title)
        // console.log(selectedKeys[0])
        if (info.selectedNodes.length !== 0) {
            this.setState({
                selectSection: info.selectedNodes[0].props.title,
                selectSectionId: selectedKeys[0]
            })
        } else {
            this.setState({
                selectSection: '',
                selectSectionId: ''
            })
        }
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            editVisible: false
        })
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }

    onOk = () => {
        const uuid = this.props.location.state.course_uuid
        const me = this
        model.fetch(
            { 'section_name': me.state.section_name, 'create_by': getUserUuid(), 'course_id': uuid },
            addSectionUrl,
            'post',
            function(response) {
                // console.log(response)
                if (response.data.execute_result === '添加成功') {
                    message.success('添加成功')
                    store.dispatch(commonAction.getCourseSection(uuid))
                    me.handleCancel()
                }
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
    }

    handledit = () => {
        // console.log(this.state.selectSection)
        const uuid = this.props.location.state.course_uuid
        const me = this
        model.fetch(
            { 'section_name': me.state.selectSection, 'section_id': me.state.selectSectionId },
            updateSectionUrl,
            'post',
            function(response) {
                // console.log(response)
                if (response.data.execute_result === '修改成功') {
                    message.success('修改成功')
                    store.dispatch(commonAction.getCourseSection(uuid))
                    me.handleCancel()
                }
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
    }

    showeditSection = () => {
        // console.log(this.state.selectSection)
        if (this.state.selectSection === '') {
            message.warning('请先选择章节')
        } else {
            this.setState({
                editVisible: true
            })
        }
    }

    showDeleteConfirm = () => {
        const me = this
        if (me.state.selectSectionId === '') {
            message.warning('请先选择章节')
        } else {
            confirm({
                title: '您确定要删除此章节?',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    me.deleteSection()
                }
              })
        }
    }

    deleteSection = () => {
        const uuid = this.props.location.state.course_uuid
        const me = this
        model.fetch(
            { 'section_id': me.state.selectSectionId },
            deleteSectionUrl,
            'post',
            function(response) {
                console.log(response)
                if (response.data.execute_result === '删除成功') {
                    message.success('删除成功')
                    store.dispatch(commonAction.getCourseSection(uuid))
                } else {
                    message.error('删除失败')
                }
            },
            function() {
                message.error('连接失败，请重试!')
            },
            false
        )
    }

    render() {
        const { courseSection } = this.props

        return (
            <div className='wrapper'>
                <div className='name'>
                    <PageHeader className='row'
                        onBack={() => window.history.back()}
                    />
                    <div className='left'>课程详情</div>
                </div>
                <div className='link'></div>
                <div className='flex'>
                <div className='catalog'>
                    <div className='title'>目录</div>
                    <div className='content'>
                        <Tree
                            className='tree'
                            switcherIcon={<Icon type='down' />}
                            defaultExpandAll
                            onSelect={this.onSelect}
                        >
                            { courseSection.length !== 0
                                ? courseSection.map((item, index) => {
                                return <TreeNode title={ item.section_name } key={ item.uuid }></TreeNode>
                                })
                                : null
                            }
                        </Tree>
                    </div>
                </div>
                <div className='control'>
                    <Button type='primary' className='button' onClick={this.showModal}>添加章节</Button>
                    <Button className='button' onClick={this.showeditSection}>编辑章节</Button>
                    <Button type='danger' className='button' onClick={ this.showDeleteConfirm } >删除章节</Button>
                </div>
                </div>
                <Modal
                        title='添加新章节'
                        visible={this.state.visible}
                        onOk={this.onOk}
                        onCancel={this.handleCancel}
                        destroyOnClose={ true }
                     >
                        <div>章节名称：
                            <Input
                                style={ { width: 300 } }
                                placeholder='章节名称'
                                onChange={ (e) => this.setState({ section_name: e.target.value }) }
                            />
                        </div>
                </Modal>
                <Modal
                        title='编辑章节'
                        visible={this.state.editVisible}
                        onOk={this.handledit}
                        onCancel={this.handleCancel}
                        destroyOnClose={ true }
                     >
                        <div>新章节名称：
                            <Input
                                style={ { width: 300 } }
                                placeholder={this.state.selectSection}
                                onChange={ (e) => this.setState({ selectSection: e.target.value }) }
                            />
                        </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courseSection: state.get('commonReducer').get('courseSection').toJS()
    }
}

export default connect(mapStateToProps, null)(CourseDetailTeacher)
