import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Select, Button, Table, Pagination, Modal } from 'antd';
import reqwest from 'reqwest';

//引入公共模块
import MixinsUTIL from '../components/mixins';

import ModalComponent from '../components/modalComponent';

const copyObject = MixinsUTIL.copyObject;
const jsonpActionRequest = MixinsUTIL.jsonpActionRequest;

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
	{
	  title: '用户名',
	  dataIndex: 'userName',
	  key: 'userName'
	}, 
	{
	  title: '用户身份',
	  dataIndex: 'userIdentityStr',
	  key: 'userIdentityStr'
	}, 
	{
	  title: '企业名称',
	  dataIndex: 'siteName',
	  key: 'siteName'
	}, 
	{
	  title: '手机号',
	  dataIndex: 'phone',
	  key: 'phone'
	}, 
	{
	  title: '注册时间',
	  dataIndex: 'createTime',
	  key: 'createTime'
	}, 
	{
	  title: '审核状态',
	  dataIndex: 'reviewStatusStr',
	  key: 'reviewStatusStr',
	  render:(text, record, index)=> <span>{text}<Link to="/index/children/123456" className="ml-20">查看</Link></span>
	}, 
	{
	  title: '域名',
	  dataIndex: 'userDomainStr',
	  key: 'userDomainStr',
	  render:(text, record, index)=> <span>{text}<a href="javascript:;" className="ml-20">设置</a></span>
	}, 
	{
	  title: '账户类型',
	  dataIndex: 'isPaidStr',
	  key: 'isPaidStr'
	}, 
	{
	  title: '账户状态',
	  dataIndex: 'accountStatusStr',
	  key: 'accountStatusStr'
	}, 
	{
	  title: '管理操作',
	  dataIndex: '',
	  key: 'manage_tag',
	  render:(text, record, index)=> <span><a href="javascript:;">开启子账户</a> | <a href="javascript:;">删除</a></span>
	}, 
	{
	  title: '详细信息',
	  dataIndex: '',
	  key: 'detail',
	  render:(text, record, index)=> <Link to="/index/children/123456" className="ml-20">查看</Link>
	}
];

let formParams = {};

class FormSearch extends React.Component {

	handleSelectChange(value){
		console.log(value);
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		let that = this;
		return (
			<Form onSubmit={(e)=>this.props.search(e,this.props.form.getFieldsValue())} layout="inline" size="large">
				<FormItem label="用户ID：">
					{getFieldDecorator('user_id',{initialValue:''})(
							<Input />
						)
					}
				</FormItem>
				<FormItem label="用户名：">
					{getFieldDecorator('userName',{initialValue:''})(
							<Input />
						)
					}
				</FormItem>
				<FormItem label="企业名称：">
					{getFieldDecorator('siteName',{initialValue:''})(
							<Input />
						)
					}
				</FormItem>
				<FormItem label="手机号：">
					{getFieldDecorator('phone',{initialValue:''})(
							<Input />
						)
					}
				</FormItem>
				<FormItem label="审核状态：">
					{getFieldDecorator('review_status',{
							onChange:this.handleSelectChange,
							initialValue:''
						})(
							<Select>
								<Option value="">全部</Option>
								<Option value="0">未审核</Option>
								<Option value="500">审核中</Option>
								<Option value="200">通过</Option>
								<Option value="100">不通过</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="客户类型：">
					{getFieldDecorator('usercanaltype',{
							onChange:this.handleSelectChange,
							initialValue:''
						})(
							<Select>
								<Option value="">全部</Option>
								<Option value="0">终端</Option>
								<Option value="1">渠道</Option>
								<Option value="2">渠道客</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="账户类型：">
					{getFieldDecorator('is_paid',{
							onChange:this.handleSelectChange,
							initialValue:''
						})(
							<Select>
								<Option value="">全部</Option>
								<Option value="0">试用</Option>
								<Option value="1">付费</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="账户状态：">
					{getFieldDecorator('account_status',{
							onChange:this.handleSelectChange,
							initialValue:''
						})(
							<Select>
								<Option value="">全部</Option>
								<Option value="200">正常</Option>
								<Option value="255">关闭</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="用户身份">
					{getFieldDecorator('userIdentity', {
			            onChange: this.handleSelectChange,
			            initialValue:''
			          })(
			            <Select style={{width: 80 + 'px'}}>
							<Option value="">全部</Option>
							<Option value="0">个人</Option>
							<Option value="1">企业</Option>
						</Select>
			       	)}	
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">搜索</Button>
				</FormItem>
			 </Form>
		);
	}
}

const FormSearchComponent = Form.create()(FormSearch);

export default class IndexComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			dataSource:[],
			pagination:{},
			loading:false,
			msg:'',
		}
	}

	handleTableChange(pagination,filters,sorter){
		const pager = this.state.pagination;
		pager.current = pagination.current;
		this.setState({
			pagination:pager
		});

		this.fetch(copyObject({
			pageno:pager.current,
			pagesize:10
		},formParams));
	}

	filterTable(e,params){
		debugger;
		e.preventDefault();
		this.setState({
			pageno:1,
			pagination:{current:1}
		});
		formParams = params;
		this.fetch(params);
		//this.fetch(copyObject({pagesize:10,pageno:1},params));
	}

	fetch(params){
		this.setState({loading:true});
		const self = this;  //保存IndexComponent的作用域，以便访问state
		/*reqwest({
			url:'http://admin.cp.pptv.com/public/index.php/userreview/user/list',
			method:'get',
			data:params,
			type:'jsonp',
			jsonpCallback:'cb'
		}).then(function(data){
			const pagination = self.state.pagination;

			pagination.total = data.totalnum;
			self.setState({
				pagination,
				loading:false,
				dataSource:data.data
			});
		});*/
		jsonpActionRequest({
			apiUrl:'http://admin.cp.pptv.com/public/index.php/userreview/user/list',
			params:params,
			callback:function(data){
				const pagination = self.state.pagination;

				pagination.total = data.totalnum;
				self.setState({
					pagination,
					loading:false,
					dataSource:data.data,
					msg:data.msg,
					visible:true
				});
			},
			errCallback:function(data){
				self.state.modalVisible = true;
			}
		});
	}

	componentDidMount(){
		this.fetch({pageno:1,pagesize:10});
	}

	handleModal(visible){
		this.setState({
			visible:visible
		});
	}

	render(){	
		return (
			<div>
				<ModalComponent message={this.state.msg} title="接口返回信息" visible={this.state.visible} handleModal={this.handleModal.bind(this)}/>
				<FormSearchComponent search={this.filterTable.bind(this)} />
				<Table pagination={this.state.pagination} dataSource={this.state.dataSource} columns={columns} bordered rowKey="id" onChange={this.handleTableChange.bind(this)} />
			</div>
		);
	}
}