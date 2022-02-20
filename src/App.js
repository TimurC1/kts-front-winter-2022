import Comparison from "pages/Comparison/Comparison";
import History from "pages/History/History";
import Home from "pages/Home/Home";
import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {Router} from "react-router-dom";
import history from "./history";
import "./App.css";
import PageBase from "./shared/PageBase";


const App = () => (
    <div className="App">
        <Router history={history}>
            <PageBase>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/compare" component={Comparison} />
                    <Route exact path="/history" component={History} />
                    <Redirect to="/" />
                </Switch>
            </PageBase>
        </Router>
    </div>
);

export default App;
