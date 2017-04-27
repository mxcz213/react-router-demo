import React from 'react';

//引入antd组件模块
import { DatePicker } from 'antd';

export default class FormComponent extends React.Component{
	onChange(date,dateString){
		console.log(date,dateString);
	}

	render(){
		return (
			<div>
				<p>我是formComponent组件</p>
				<DatePicker onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}