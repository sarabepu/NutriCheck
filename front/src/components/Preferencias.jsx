import React, { useState } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import PreferenciasAgregar from "./PreferenciasAgregar";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Preferencias(props) {
  const [modalShow, setModalShow] = useState(false);
  const [list, setList] = useState("favoritos");

  return (
    <Container className="sub-card">
      <Card>
        <Card.Header className="font-match">
          Mis preferencias alimenticias
          <PreferenciasAgregar
            list={list}
            user={props.user}
            show={modalShow}
            setUser={props.setUser}
            onHide={() => setModalShow(false)}
          />
        </Card.Header>

        <Card.Body>
          <div className="overflow-auto card-content">
            <div className="subtitle">
              <span>Favoritos </span>
              <Button
                className="secondary-button"
                onClick={() => {
                  setList("favoritos");
                  setModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
            <div className="preferences">
              {props.user.favoritos.length > 0 ? (
                props.user.favoritos.map((fav) => {
                  return (
                    <Badge key={fav} pill className="mr-1">
                      {fav.toLowerCase()}
                    </Badge>
                  );
                })
              ) : (
                <p>No has seleccionado favoritos.</p>
              )}
            </div>
            <hr></hr>
            <div className="subtitle">
              <span>Desagradables </span>
              <Button
                className="secondary-button"
                onClick={() => {
                  setList("desagradables");
                  setModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
            <div className="preferences">
              {props.user.desagradables.length > 0 ? (
                props.user.desagradables.map((fav) => {
                  return (
                    <Badge key={fav} pill className="mr-1">
                      {fav.toLowerCase()}
                    </Badge>
                  );
                })
              ) : (
                <p>No has seleccionado desagradables.</p>
              )}
            </div>
            <hr></hr>
            <div className="subtitle">
              <span>Alergias </span>
              <Button
                className="secondary-button"
                onClick={() => {
                  setList("alergias");
                  setModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
            <div className="preferences">
              {props.user.alergias.length > 0 ? (
                props.user.alergias.map((fav) => {
                  return (
                    <Badge key={fav} pill className="mr-1 mb-1">
                      {fav.toLowerCase()}
                    </Badge>
                  );
                })
              ) : (
                <p>No has seleccionado alergias.</p>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Preferencias;
