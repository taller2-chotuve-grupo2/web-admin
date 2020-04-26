import React, {useState} from 'react';
import {Button, Row, Container, Col, FormControl, InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom';
import chotuveLogo from './chotuve.png'


export function Login(){
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
        return ([
            <LoginHeader/>,
            <LoginRect usuario={usuario} password={password} setUsuario={setUsuario}
                       setPassword={setPassword} history={history}/>
        ])
}

class LoginHeader extends React.Component {
    render() {
        return (
            <div>
                <Container fluid="sm">
                    <Row>
                        <Col className="p-6 col-6">
                            <img src={chotuveLogo} alt="fireSpot"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


class LoginRect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: null,
            password: null,
            setUsuario: null,
            setPassword: null,
            history: null,
        };
    }

    redirectToAbout = () => {
        validate_credentials(this.props.usuario, this.props.password, this.props.history);
    }

    render() {
        return (
            <Container fluid="sm">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="p-4 col-4 login-cuadro">

                        <h1>Inicio de sesión</h1>

                        {/* Input group Usuario */}
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="txtUsuario"
                                value={this.props.usuario}
                                placeholder="Usuario"
                                aria-label="Usuario"
                                aria-describedby="basic-addon1"
                                onChange={e => this.props.setUsuario(e.target.value)}
                            />
                        </InputGroup>

                        {/* Input Group Contraseña */}
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="txtPassword"
                                value={this.props.password}
                                type="password"
                                placeholder="Constraseña"
                                aria-label="Contraseña"
                                aria-describedby="basic-addon1"
                                onChange={e => this.props.setPassword(e.target.value)}
                            />
                        </InputGroup>

                        {/* Boton Log In */}
                        <Button onClick={() => {
                            this.redirectToAbout();
                        }
                        }>Login</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function validate_credentials(user, password, history){
    if (user === 'admin' && password === 'admin'){
        history.push('/about');
    }
}