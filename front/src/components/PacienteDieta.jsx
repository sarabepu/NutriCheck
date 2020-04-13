import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

function PacienteDieta(props) {
  const [calorias, setCalorias] = useState(2000);
  const [ingredients, setIngredients] = useState(null);
  let dia = new Date().getDay();

  useEffect(() => {
    fetch("http://localhost:3000/ingredients")
      .then((res) => res.json())
      .then((res) => {
        let ings = new Map();
        for (const i of res) {
          ings.set(i.nombre, i.name);
        }
        setIngredients(ings);
      });
  }, []);

  let onSubmit = () => {
    let desagradables = props.paciente.desagradables.map((i) =>
      ingredients.get(i)
    );
    let alergias = props.paciente.alergias.map((i) => ingredients.get(i));
    let query = desagradables.join(", ");
    let query2 = alergias.join(", ");
    if (query2) query = query + props.paciente.alergias.join(", ");

    fetch("http://localhost:3000/ingredients/generate", {
      method: "POST",
      body: {
        query: query,
        diet: "",
        calories: calorias,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let meals = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
        for (const meal of response.items) {
          const day = parseInt(meal.day);
          const slot = parseInt(meal.slot);
          const recipe = JSON.parse(meal.value);
          meals[day - 1][slot - 1] = recipe.title;
        }
        fetch(`http://localhost:3000/user/${props.paciente.username}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "dieta",
            object: meals,
          }),
        }).then(() => {
          let newPaciente = {};
          Object.assign(newPaciente, props.paciente);
          newPaciente.dieta = meals;
          props.setPaciente(newPaciente);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="sub-card">
      <Card>
        <Card.Header>Dieta</Card.Header>

        <Card.Body>
          <div className="overflow-auto card-content">
            {props.paciente.dieta && props.paciente.dieta[0] !== "nada" ? (
              <>
                <div className="subtitle">Desayuno</div>
                <div className="diet">{props.paciente.dieta[dia][0]}</div>
                <hr />
                <div className="subtitle">Almuerzo</div>
                <div className="diet">{props.paciente.dieta[dia][1]}</div>
                <hr />
                <div className="subtitle">Cena</div>
                <div className="diet">{props.paciente.dieta[dia][2]}</div>
              </>
            ) : (
              <div>
                Su paciente aún no tiene una dieta asignada. A continuación,
                seleccione la cantidad de calorías adecuada teniendo en cuenta
                los parámetros de arriba.
                <br />
                <Form>
                  <Form.Group controlId="calories">
                    <Form.Label>Calorías (por día) </Form.Label>
                    <Form.Control
                      type="number"
                      value={calorias}
                      onChange={(e) => setCalorias(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Generar
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PacienteDieta;
