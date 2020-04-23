import React, { useState } from 'react';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './About'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import * as login from './LoginPage'

document.body.style = 'background: black;';


export default function App() {
    // Declare a new state variable, which we'll call "count"
    //const [count, setCount] = useState(0);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    return (


        <div className="body-login">
            <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <login.LoginHeader />
                        <login.LoginRect usuario={usuario} password={password} setUsuario={setUsuario} setPassword={setPassword}/>
                    </Route>
                </Switch>
            </div>
        </Router>
        </div>
  );
}
