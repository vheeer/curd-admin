import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import Frame from './components/Frame';
import Curd from './routes/Curd';

import IndexPage from './routes/IndexPage';

let WrapFrame = connect(({ page, account }) => ({
  page, 
  account
}))(Frame);
function RouterConfig({ history }) {
  return (
    <Router history={history}>
		<Switch>
			<WrapFrame>
		   		<Route path="/" exact component={IndexPage} />


		   		<Route path="/shop/brand" exact component={Curd("brand")} />

		   		<Route path="/order/list" exact component={Curd("order")} />

			</WrapFrame>
		</Switch>
    </Router>
  );
}

export default RouterConfig;
