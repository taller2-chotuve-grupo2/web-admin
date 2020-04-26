import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useHistory } from 'react-router-dom';
import {Button, Row, Container, Navbar, Nav } from "react-bootstrap";
import chotuveLogo from "./chotuve.png";
import "./index.css";
import { Redirect } from 'react-router-dom';



export default function Home() {
    if(!localStorage.getItem('user')){
        return <Redirect to="/login"/>;
    }
    return ([
        <HomeHeader/>,
        <HomeRect/>
    ])
}

class HomeHeader extends React.Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <img src={chotuveLogo} class="rounded float-left" alt="chotuve-logo"/>
                    </Row>
                </Container>

                <div>
                    <Navbar bg="dark" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Button variant="dark" href="/home">Home</Button>
                                <Button variant="dark" href="/about">Link</Button>
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