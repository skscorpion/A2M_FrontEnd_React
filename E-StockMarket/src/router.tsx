import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './component/Login';
import Home from './component/Home';
import CompanyForm from './component/form/CompanyForm';
import Layout from './component/layout';
import Page404 from './component/Page404';
import StockDetails from './component/StockDetails';

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/Login' component={Login} />
				<Route exact path='/Home' component={Home} />
				<Route exact path='/StockDetails' component={StockDetails} />
				<Route exact path='/Add' component={CompanyForm} />
				<Route exact path='/Edit' component={CompanyForm} />
				<Route exact path='/View' component={CompanyForm} />
				<Route exact path='/Layout' component={Layout} />
				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
