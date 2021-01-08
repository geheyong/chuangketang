import React, { Component } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { Model } from '../../dataModule/testBone'
import { registerUrl } from '../../dataModule/UrlList'

const model = new Model()
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmLoading: false,
            confirmDirty: false,
            autoCompleteResult: []
        }
    }

    handleCancel = () => {
        this.props.cancel(false)
    };

    handleRegister = (data) => {
        const me = this
        model.fetch(
            data,
            registerUrl,
            'post',
            function(response) {
                if (response.data.executue_result === '账号已存在') {
                    me.setState({
                        confirmLoading: false
                    })
                    message.error('账号已存在')
                } else {
                    me.props.cancel(false)
                    me.setState({
                        confirmLoading: false
                    })
                    message.success('注册成功')
                }
            },
            function() {
                message.warning('发送请求失败，请重试')
                setTimeout(() => {
                    me.setState({
                    confirmLoading: false
                    })
                }, 2000)
            },
            false
        )
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            delete values.confirm
            // console.log('注册的内容: ', values)
            this.setState({
                confirmLoading: true
            })
            this.handleRegister(values)
          }
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!')
        } else {
          callback()
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
            }
        }

        const tailFormItemLayout = {
            wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 10
            }
            }
        }

        return (
            <Modal
                title='注册账号'
                visible={ this.props.visible }
                confirmLoading={ this.state.confirmLoading }
                destroyOnClose={ true }
                footer={null}
                onCancel={ this.handleCancel }
                // destroyOnClose={ true }
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label='用户名'>
                        {getFieldDecorator('user_name', {
                        rules: [
                            {
                            required: true,
                            message: '请输入用户名'
                            }
                        ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='账号'>
                        {getFieldDecorator('account', {
                        rules: [
                            {
                            required: true,
                            message: '请输入账号'
                            }
                        ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='密码' hasFeedback>
                        {getFieldDecorator('password', {
                        rules: [
                            {
                            required: true,
                            message: '请输入密码!'
                            },
                            {
                            validator: this.validateToNextPassword
                            }
                        ]
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label= '确认密码' hasFeedback>
                        {getFieldDecorator('confirm', {
                        rules: [
                            {
                            required: true,
                            message: '请确认密码!'
                            },
                            {
                            validator: this.compareToFirstPassword
                            }
                        ]
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type='primary' htmlType='submit'>
                        注册
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(Register)
