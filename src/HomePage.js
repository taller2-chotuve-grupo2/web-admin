import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useHistory } from 'react-router-dom';
import {Button, Row, Container, Navbar, Nav } from "react-bootstrap";
import chotuveLogo from "./chotuve.png";
import "./index.css";
import { Redirect, useHistory } from 'react-router-dom';



export default function Home() {
    
    let history = useHistory();
    if(!localStorage.getItem('user')){
        return <Redirect to="/login"/>;
    }
    return ([
        <HomeHeader hst={history}/>,
        <HomeRect/>
    ])
}

class HomeHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hst: null,
        }
    }

    redirectHome = () => {
        this.props.hst.push("/home");
    }

    redirectAbout = () => {
        this.props.hst.push("/about");
    }


    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <img src={chotuveLogo} className="rounded float-left" alt="chotuve-logo"/>
                    </Row>
                </Container>

                <div>
                    <Navbar bg="dark" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Button variant="dark" onClick={this.redirectHome}>Home</Button>
                                <Button variant="dark" onClick={this.redirectAbout}>Link</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}

class HomeRect extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}