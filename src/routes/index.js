import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Gallery from '../components/ui/Gallery';

import Orderception from '../components/draw/Exception';
import UpOrderExcep from '../components/draw/UpDrawExcep';
import AddOrderExcep from '../components/draw/AddDrawExcep';
import EditOrderIssueNo from '../components/draw/EditIssueNo';


export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                <Route exact path="/app/dashboard/index" component={Dashboard} />

                <Route exact path="/app/order/exception" component={Orderception} />
                <Route exact path="/app/order/editdrawexcep" component={UpOrderExcep} />
                <Route exact path="/app/order/addDrawExcep" component={AddOrderExcep} />
                <Route exact path="/app/order/issueNo" component={EditOrderIssueNo} />

                <Route exact path="/app/ui/gallery" component={Gallery} />

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}