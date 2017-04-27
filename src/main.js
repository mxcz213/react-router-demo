/**
	authors hcj
	version 1.0
*/
import React from 'react';
import ReactDOM from 'react-dom';
//import { Render } from 'react-dom';

//引入react-router
import { BrowserRouter, Router, HashRouter, Match, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink } from 'react-router-dom';


//引入Ant-design模块
import { Menu,Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import '../src/css/main.css';

//引入components
import HeaderComponent from '../src/components/headerComponent';
import IndexComponent from '../src/components/indexComponent';
import IndexChildren from '../src/components/indexChildren';
import TableComponent from '../src/components/tableComponent';
import FormComponent from '../src/components/formComponent';

//获取屏幕的高度
function _getClientHeight(){
	let winHeight = 0;
	let cHeight = 0;
	if(window.innerHeight){
		winHeight = window.innerHeight;
	} else if(document.body && document.body.clientHeight){
		winHeight = document.body.clientHeight;
	}

	if(document.documentElement && document.documentElement.clientHeight){
		cHeight = document.documentElement.clientHeight
		winHeight = winHeight > cHeight ? winHeight : cHeight;
	}
	return winHeight;
}

class SliderComponent extends React.Component{		
	constructor(props) {
        super(props)
        this.state={
			username:'hcj',
			current:'1'
		}
    }

    handleClick(e){
    	this.setState({
    		current:e.key
    	});
    }

    componentDidMount(){
    	const rightContent = document.getElementById('rightContent');
    	const header = document.getElementById('header');
    	rightContent.style.minHeight = _getClientHeight() - header.offsetHeight + 'px';
    }

	render(){
		return (
			<div className="wapper">
				<HeaderComponent></HeaderComponent>
				<div className="main">
					<div className="leftMenu" id="leftMenu">
						<Menu mode="inline" theme="dark" onClick={this.handleClick.bind(this)} defaultOpenKeys={['sub1']} selectedKeys={[this.state.current]}>
							<SubMenu key="sub1" title={<span><Icon type="user" /><span>用户模块</span></span>}>
								<Menu.Item key="1"><Link to="/index">用户管理</Link></Menu.Item>
								<Menu.Item key="2"><Link to="/table">用户统计</Link></Menu.Item>
								<Menu.Item key="3"><Link to="/form">计费管理</Link></Menu.Item>
								<Menu.Item key="4"><Link to="/form">账单查询</Link></Menu.Item>
								<Menu.Item key="5"><Link to="/form">功能管理</Link></Menu.Item>
							</SubMenu>
							<SubMenu key="sub2" title={<span><Icon type="play-circle-o" /><span>直点播管理</span></span>}>
								<Menu.Item key="6"><Link to="/index">直播监控</Link></Menu.Item>
								<Menu.Item key="7"><Link to="/table">用户上报</Link></Menu.Item>
								<Menu.Item key="8"><Link to="/form">点播查看</Link></Menu.Item>
								<Menu.Item key="9"><Link to="/form">视频审核报告</Link></Menu.Item>
							</SubMenu>
							<SubMenu key="sub3" title={<span><Icon type="notification" /><span>渠道管理</span></span>}>
								<Menu.Item key="10"><Link to="/index">渠道账号管理</Link></Menu.Item>
								<Menu.Item key="11"><Link to="/table">渠道客管理</Link></Menu.Item>
							</SubMenu>
							<SubMenu key="sub4" title={<span><Icon type="setting" /><span>权限管理</span></span>}>
								<Menu.Item key="12"><Link to="/index">admin权限</Link></Menu.Item>
								<Menu.Item key="13"><Link to="/table">浏览权限</Link></Menu.Item>
							</SubMenu>
						</Menu>
					</div>
					<div className="rightContent" id="rightContent">
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
}

//配置路由
ReactDOM.render((
	<HashRouter history={hashHistory} >
		<SliderComponent>
			<Route exact path="/" component={IndexComponent} />
			<Route path="/table" component={TableComponent} />
			<Route path="/form" component={FormComponent} />
			<Route exact path="/index" component={IndexComponent} />
			<Route path="/index/children/:id" component={IndexChildren} />
		</SliderComponent>
		
	</HashRouter>
),document.getElementById('app'));

//newsapi.gugujiankong.com