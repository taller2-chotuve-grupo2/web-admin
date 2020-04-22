import React, { useState } from 'react';
import "./index.css";
import {Button, Row, Container, Col, FormControl, InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Example() {
  // Declare a new state variable, which we'll call "count"
  //const [count, setCount] = useState(0);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    function limpiarCampos(){
        setUsuario("");
        setPassword("");
    }

  return (
    <div> 
    <Container fluid="sm">
        <Row className="d-flex justify-content-center align-items-center">
            <Col className="p-4 col-4">

                

                <h1>Inicio de sesión</h1>
                
                {/* Input group Usuario */}
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    id="txtUsuario"
                    value={usuario}
                    placeholder="Usuario"
                    aria-label="Usuario"
                    aria-describedby="basic-addon1"
                    onChange= {e => setUsuario(e.target.value)}
                    />
                </InputGroup>

                {/* Input Group Contraseña */}
                <InputGroup className="mb-3" controlId="asd">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    id="txtPassword"
                    value={password}
                    type="password"
                    placeholder="Constraseña"
                    aria-label="Contraseña"
                    aria-describedby="basic-addon1"
                    onChange= {e => setPassword(e.target.value)}
                    />
                </InputGroup>

                {/* Boton Log In */}
                <Button onClick={limpiarCampos}>Login</Button>



            </Col>
        </Row>
    </Container>
    </div>
  );
}

export class Ejemplo extends React.Component{
    render(){
        return(
            <div className="example">
                <Example />
            </div>
        )
    }
}