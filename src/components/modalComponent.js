import React from 'react';

import { Modal, Button } from 'antd';

export default class ModalComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible:this.props.visible
		}
	}

	handleCancel(){
		this.props.handleModal(false);
	}

	render(){
		return (
			<div>
				<Modal title={this.props.title} wrapClassName="vertical-center-modal" visible={this.props.visible} onCancel={()=>this.handleCancel(false)} footer={null}>
					<p>{this.props.message}</p>
				</Modal>
			</div>	
		);
	}
}
