import React, { useState, useEffect } from "react";
import { Col, Nav, Card, Row, Button, Container } from 'react-bootstrap';
import RegistroPaciente from './RegistroPaciente';
import RegistroNutri from './RegistroNutri';
function Registro(){

    const [isPaciente,setPaciente] = useState(true)


    

    return (
        <Container id="main-card">
            <Card>
                <Card.Header>

                    <Nav variant="tabs" defaultActiveKey="#first">

                        <Nav.Item id="button-paciente" onClick={ () => setPaciente(true) }>
                            <Nav.Link href="#first">Paciente</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="button-Nutri" onClick={ () => setPaciente(false) }>
                            <Nav.Link href="#second">Nutricionista</Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Card.Header>

                <Card.Body>
                    { (isPaciente) ? <RegistroPaciente />:<RegistroNutri />  }
                </Card.Body>
            </Card>
        </Container>
    );


}

export default Registro;