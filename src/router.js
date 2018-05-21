import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import Frame from './components/Frame';
import Curd from './routes/Curd';
import menuConfig from './menuConfig.json';
import IndexPage from './routes/IndexPage';

const routes = [];
menuConfig.forEach(firstPath => {
	const { href: href_1, children } = firstPath;
	if(children)
		children.forEach(secondPath => {
			const { href: href_2, model } = secondPath;
			routes.push((
				<Route key={href_1 + href_2} path={href_2.substr(1)} exact component={Curd(model)} />
			));
		});
});


let WrapFrame = connect(({ page, account }) => ({
  page, 
  account
}))(Frame);
function RouterConfig({ history }) {
	console.log("routes", routes);
  return (
    <Router history={history}>
		<Switch>
			<WrapFrame>
		   		<Route path="/" exact component={IndexPage} />
		   		{routes}
			</WrapFrame>
		</Switch>
    </Router>
  );
}

export default RouterConfig;
