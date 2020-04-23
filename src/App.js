import React, { useState } from 'react';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import * as login from './Login'

document.body.style = 'background: black;';


export default function App() {
    // Declare a new state variable, which we'll call "count"
    //const [count, setCount] = useState(0);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    return (


        <div className="body-login">
            <login.LoginHeader />
            <login.LoginRect usuario={usuario} password={password} setUsuario={setUsuario} setPassword={setPassword}/>
        </div>
  );
}
