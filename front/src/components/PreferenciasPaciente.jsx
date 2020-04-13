import React from "react";
import { Badge, Card, Container } from "react-bootstrap";

function PreferenciasPaciente(props) {
  return (
    <Container className="sub-sub-card">
      <Card>
        <Card.Header>Preferencias alimenticias</Card.Header>

        <Card.Body>
          <div className="overflow-auto card-content">
            <div className="subtitle">
              <span>Favoritos </span>
            </div>
            <div className="preferences">
              {props.paciente.favoritos.length > 0 ? (
                props.paciente.favoritos.map((fav) => {
                  return (
                    <Badge key={fav} pill className="mr-1">
                      {fav.toLowerCase()}
                    </Badge>
                  );
                })
              ) : (
                <p>No ha seleccionado favoritos.</p>
              )}
            </div>
            <hr></hr>
            <div className="subtitle">
              <span>Desagradables </span>
            </div>
            <div className="preferences">
              {props.paciente.desagradables.length > 0 ? (
                props.paciente.desagradables.map((fav) => {
                  return (
                    <Badge key={fav} pill className="mr-1">
                      {fav.toLowerCase()}
                    </Badge>
                  );
                })
              ) : (
                <p>No ha seleccionado desagradables.</p>
              )}
            </div>
            <hr></hr>
            <div className="subtitle">
              <span>Alergias </span>
            </div>
            <div className="preferences">
              {props.paciente.alergias.length > 0 ? (
                props.paciente.alergias.map((fav) => {
                  return (
                    <Badge key={fav} pill className="mr-1 mb-1">
                      {fav.toLowerCase()}
                    </Badge>
                  );
                })
              ) : (
                <p>No ha seleccionado alergias.</p>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PreferenciasPaciente;
