import React from 'react';

export default class IndexChildren extends React.Component{

	render(){
		return (
			<div>我是IndexChildren组件,传来的参数是id：{this.props.match.params.id}</div>
		);
	}
}