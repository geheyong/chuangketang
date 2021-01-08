import React, { Component } from 'react'
import { Layout, Icon, Dropdown, Menu, message } from 'antd'
import history from './history'
import { removeCookie } from '../../helpers/cookies'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../../style/header.less'
import logo from '../../statistics/logo.png'
import { nowTime } from '../../publicFunction/index'
import { outLogin } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'
import { getUserUuid } from '../../publicFunction'
// import { setCookie } from '../../helpers/cookies'
// import { color } from 'echarts/src/export'

const { Header } = Layout
const model = new Model()

class HeaderCustom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: props.collapsed,
            date: nowTime()
        }
        this.logout = this.logout.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.onCollapse(nextProps.collapsed)
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed
        })
    };

    logout = () => {
      model.fetch(
        { 'uuid': getUserUuid() },
        outLogin,
        'post',
        function(response) {
          message.success('登出成功')
        },
        function() {
          message.error('登出失败')
        },
        false
      )
        // 删除登陆信息，并跳转页面
        removeCookie('mspa_user')
        history.push('/login')
    };

    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: nowTime()
        })
    }

    render() {
      const menu = (
        <Menu>
          <Menu.Item onClick={this.logout}>退出登陆</Menu.Item>
        </Menu>
      )

      return (
        <Header className='header-style header'>
          <img alt='logo' src={logo}/>
          <Link to='/technology-system'>
            <span className={'header-span'}>创课堂</span>
          </Link>
          <span className='date-span'>{this.state.date.toLocaleString()}</span>
          <div className={'user-icon-div'}>
            <Dropdown overlay={menu}>
              <a className='ant-dropdown-link' onClick={e => e.preventDefault()} style={{ color: 'white' }}>
                <span style={{ marginRight: 5 }}>
                  <Icon type='user' style={{ marginRight: 10 }}/>
                  {this.props.username}
                </span>
                <Icon type='down' />
              </a>
            </Dropdown>
          </div>
        </Header>
      )
    }
}

export default withRouter(HeaderCustom)
