import React from 'react';
import ReactDOM from 'react-dom';

//引入react-router
import { BrowserRouter, Router, HashRouter, Match, Route, Link, hashHistory, IndexLink } from 'react-router-dom';

//引入components
import HeaderComponent from '../src/components/headerComponent.js';
import IndexComponent from '../src/components/indexComponent.js';
import IndexChildren from '../src/components/indexChildren.js';
import TableComponent from '../src/components/tableComponent.js';
import FormComponent from '../src/components/formComponent.js';

class SliderComponent extends React.Component{		
	constructor(props) {
        super(props)
    }
	render(){
		return (
			<div className="wapper">
				<HeaderComponent></HeaderComponent>
				<div className="main">
					<div className="leftMenu">
						<Link to="/index">index</Link>
						<Link to="/table">table</Link>
						<Link to="/form">form</Link>
					</div>
					<div className="rightContent">
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
			<Route exact path="/index/children" component={IndexChildren} />
		</SliderComponent>
		
	</HashRouter>
),document.getElementById('app'));