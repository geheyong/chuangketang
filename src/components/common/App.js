import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { getCookie, setCookie } from '../../helpers/cookies'
import store from '../../store'
import { Provider } from 'react-redux'
import { actionCreators as commonAction } from './store'
import { flattenArrays } from '../../publicFunction'

import SideMenu from './SideMenu'
import HeaderCustom from './HeaderCustom'
import TribuneDetail from '../../view/tribune/TribuneDetail/TribuneDetail'
import noMatch from './404'

import '../../style/index.less'

import CourseDetailTeacher from '../../view/course/CourseDetail/CourseDetailTeacher'
import CourseDetailStudent from '../../view/studentCourse/courseDetail/CourseDetailStudent'

const { Content, Footer, Sider } = Layout

class App extends Component {
  state = {
    collapsed: getCookie('mspa_SiderCollapsed') === 'true'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    }, function() {
      setCookie('mspa_SiderCollapsed', this.state.collapsed)
    })
  };

  componentDidMount() {
    if (getCookie('mspa_SiderCollapsed') === null) {
      setCookie('mspa_SiderCollapsed', false)
    }
    // commonAction.getAllBillTypes()
    store.dispatch(commonAction.getCourseInfo())
  }

  render() {
    const { collapsed } = this.state
    // const { location } = this.props
    let name
    if (!getCookie('mspa_user') || getCookie('mspa_user') === 'undefined') {
      return <Redirect to='/login' />
    } else {
      name = JSON.parse(getCookie('mspa_user')).user_name
    }

    let routers = store.getState().get('commonReducer').get('routers').toJS()
    routers = flattenArrays(routers, 'child')
    // const breadcrumbList = getBreadFromLocation(routers, location.pathname)

    return (
      <Layout>
        <Provider store={store}>
          <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name} />

          <Content>
            {/* <HeaderMenu /> */}
            <Layout style={{ padding: '0 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <SideMenu />
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{ padding: '0 24px', minHeight: 'calc(100vh)' }}>
                <Switch>
                  { routers.map(item => item.routerDom) }
                  <Route path='/app/courseDetailTeacher' component={(props) => <CourseDetailTeacher {...props}/>} />
                  <Route path='/app/courseDetailStudent' component={(props) => <CourseDetailStudent {...props}/>} />
                  <Route path={'/app/tribune/tribune_detail'} component={TribuneDetail} />
                  <Route component={noMatch} />
                </Switch>
              </Content>
            </Layout>
            </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', backgroundColor: '#778899', color: 'white', marginLeft: 200 }}>
            <span style={{ display: 'block' }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
            <span style={{ display: 'block' }}>联系电话：12345</span>
            <span style={{ display: 'block' }}>邮箱：12345@qq.com</span>
          </Footer>
        </Provider>
      </Layout>
    )
  }
}

export default withRouter(App)
