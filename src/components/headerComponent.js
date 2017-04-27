import React from 'react';

export default class HeaderComponent extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:'mxcz213'
		}
	}

	loginOut(){
		window.location.href = 'https://www.baidu.com/';
	}

	render(){
		return (
			<div className="header" id="header">
				<h2 className="title"><img src="http://admin.cp.pptv.com/public/sharemanage/images/logo.png" alt="logo" /></h2>
				<div className="login">
					<span className="mr-20">{this.state.username}</span>
					<a href="javascript:;" onClick={this.loginOut.bind(this)}>退出登录</a>
				</div>
			</div>
		);
	}
}