import React  from 'react';
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom';
import {HomeHeader, HomeRect} from "./HomePage";


import {Button} from "react-bootstrap"


export default function UsersPage(){
    let history = useHistory();
    if(!localStorage.getItem('user')){
        return <Redirect to="/login"/>;
    }

    return([
        <HomeHeader hst={history}/>,
        <HomeRect/>,
        <UsersBody/>
    ])
}

class UsersBody extends React.Component{
    render() {
      return(<h>Hello there</h>)
    }

}
