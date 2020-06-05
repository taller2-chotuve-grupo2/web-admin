import React  from 'react';
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom';

import {Button} from "react-bootstrap"


export default function AboutPage(){

    let history = useHistory();

    if(!localStorage.getItem('user')){
        return <Redirect to="/login"/>;
    }else{
        return(
            <div>
                <h1 style={{color: 'white'}}>Bienvenido, {localStorage.getItem('user')}!</h1>
                <Button onClick={() => {
                        logOut(history);
                    }
                    }>Log Out</Button>
            </div>
        )
    }
}

function logOut(history){
    localStorage.removeItem('user');
    history.push("/")
}