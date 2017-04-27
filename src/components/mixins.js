/**
	* 对象合并
    * @method
    * @param {Object}orig
    *      原始对象
    * @param {Object}desi
    *      目标对象

*/
import reqwest from 'reqwest';

const MixinsUTIL = {
	copyObject:function(orig,desi){
		for(let p in orig){
			desi[p] = orig[p];
		}
		return desi;
	},
	jsonpActionRequest:function(option){
		option.params.format = 'json';
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
		reqwest({
			url:option.apiUrl,
			method:'get',
			data:option.params,
			type:'jsonp',
			jsonpCallback:'cb'
		})
		.then(function(data){
			if(data.err == '0'){
				option.callback && option.callback(data);
			}
		},function(data){
			if(data.err !== '0'){
				option.errCallback && option.errCallback(data)
			}
		});
	}
};

export default MixinsUTIL;
