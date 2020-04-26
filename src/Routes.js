import React, {Component} from "react";
import About from './About'
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import * as login from './LoginPage' ;


export default class Routes extends Component {


    render() {
        return (
            <div className="body-login">
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route path="/about">
                                <About/>
                            </Route>
                            <Route path="/">
                                <login.Login/>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
