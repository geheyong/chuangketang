import React, { Component } from 'react'
import { setCookie } from '../../helpers/cookies'
import '../../style/login.less'
import { Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd'
import Register from './register'
import { Model } from '../../dataModule/testBone'
import { loginUrl } from '../../dataModule/UrlList'

const FormItem = Form.Item
const model = new Model()
// const users = [{
//     username: 'admin',
//     password: 'admin'
// }, {
//   username: 'reviewer1',
//   password: 'reviewer1'
// }, {
//   username: 'reviewer2',
//   password: 'reviewer2'
// }, {
//   username: 'reviewer3',
//   password: 'reviewer3'
// }, {
//   username: 'rectifier1',
//   password: 'rectifier1'
// }, {
//   username: 'rectifier2',
//   password: 'rectifier2'
// }, {
//   username: 'rectifier3',
//   password: 'rectifier3'
// }]

// function PatchUser(values) {
//     const { username, password } = values
//     return users.find(user => user.username === username && user.password === password)
// }

class NormalLoginForm extends Component {
    state = {
        isLoding: false,
        registerVisible: false
    };
    handleSubmit = (e) => {
        e.preventDefault()
        const me = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of operation: ', values)
                model.fetch(
                    values,
                    loginUrl,
                    'post',
                    function(response) {
                        if (response.data.execute_result === '账号不存在') {
                            message.error('账号不存在')
                        } else if (response.data.execute_result === '密码错误') {
                            message.error('密码错误')
                        } else {
                            this.setState({
                                isLoding: true
                            })
                            values['user_name'] = response.data.user.user_name
                            values['uuid'] = response.data.user.uuid
                            values['role_id'] = response.data.user.role_id
                            setCookie('mspa_user', JSON.stringify(values))
                            message.success('登录成功')
                            setTimeout(function() {
                                // that.props.history.push({ pathname: '/app', state: values })
                                me.props.history.push({ pathname: '/app/course', state: values })
                            }, 2000)
                        }
                    },
                    function() {
                        message.error('登录失败')
                    },
                    false
                )

                // if (PatchUser(values)) {
                //     this.setState({
                //         isLoding: true
                //     })
                //     values['_id'] = values.username

                //     // console.log(values);
                //     setCookie('mspa_user', JSON.stringify(values))

                //     message.success('登录成功!')
                //     const that = this
                //     setTimeout(function() {
                //         // that.props.history.push({ pathname: '/app', state: values })
                //         that.props.history.push({ pathname: '/app/course', state: values })
                //     }, 2000)
                // } else {
                //     message.error('登录失败!')
                // }
            }
        })
    }

    showVisible = () => {
        this.setState({
            registerVisible: true
        })
    }

    closeVisible = (visible) => {
        this.setState({
            registerVisible: visible
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            this.state.isLoding ? <Spin size='large' className='loading' /> : <div className='login'>
                <div className='login-form'>
                    <div className='login-logo'>
                        <div className='login-name' style={{ marginLeft: '30px' }}>325 实验室基础前端框架</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(
                                <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='账号 (admin)' />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }]
                            })(
                                <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码 (admin)' />
                            )}
                        </FormItem>
                        <FormItem style={{ marginBottom: '0' }}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <div className='login-form-forgot' style={{ float: 'right', cursor: 'pointer', color: '#00A0E9' }} onClick={ this.showVisible } >注册</div>
                            <Button type='primary' htmlType='submit' className='login-form-button' style={{ width: '100%' }}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                    {/* <a className='githubUrl' href={`${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`}> </a> */}
                    <Register
                        visible={ this.state.registerVisible }
                        cancel={ this.closeVisible }
                    />
                </div>
            </div>
        )
    }
}

const Login = Form.create()(NormalLoginForm)
export default Login
