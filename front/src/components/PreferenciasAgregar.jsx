import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function PreferenciasAgregar(props) {
  const [ingredients, setIngredients] = useState([]);
  const [checks, setChecked] = useState({});

  useEffect(() => {
    fetch("/ingredients")
      .then((res) => res.json())
      .then((res) => {
        setIngredients(res.map((i) => i.nombre.toLowerCase()).sort());
      });
  }, []);

  useEffect(() => {
    let myIngredients = new Map();

    for (const myIng of props.user[props.list]) {
      myIngredients.set(myIng, true);
    }

    let newCheck = {};
    for (const i of ingredients) {
      newCheck[i] = myIngredients.get(i) === true;
    }
    setChecked(newCheck);
  }, [props.list, props.user, ingredients]);

  let onSubmit = () => {
    let newList = [];
    for (const ing in checks) {
      if (checks[ing]) newList.push(ing);
    }
    fetch(`/user/${props.user.username}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: props.list, object: newList }),
    }).then(() => {
      let newUser = {};
      Object.assign(newUser, props.user);
      newUser[props.list] = newList;
      props.setUser(newUser);
    });
  };

  let onChange = (ing) => {
    setChecked((prevChecks) => {
      let newChecks = {};
      Object.assign(newChecks, prevChecks);
      newChecks[ing] = !newChecks[ing];
      return newChecks;
    });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar {props.list}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="preferences-check">
          {ingredients.map((ing) => (
            <Form.Check
              inline
              key={ing}
              type={"checkbox"}
              id={ing}
              label={ing.toLowerCase()}
              checked={checks[ing]}
              onChange={() => onChange(ing)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onSubmit();
            props.onHide();
          }}
        >
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PreferenciasAgregar;
