import React, {Component} from "react";
import About from './About'
import {
    HashRouter,
    Switch,
    Route
} from "react-router-dom";
import * as login from './LoginPage' ;
import Home from './HomePage';


export default class Routes extends Component {

    render() {
        return (
            <div className="body-login">
                <HashRouter>
                    <div>
                        <Switch>
                            <Route path={process.env.PUBLIC_URL + "/about"}>
                                <About/>
                            </Route>
                            <Route path={process.env.PUBLIC_URL + "/home"}>
                                <Home/>
                            </Route>
                            <Route path={process.env.PUBLIC_URL + "/"}>
                                <login.Login/>
                            </Route>

                        </Switch>
                    </div>
                </HashRouter>
            </div>
        )
    }
}
