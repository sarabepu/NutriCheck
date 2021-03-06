import React, { useState, useEffect } from "react";
import { Col, Form, Button } from "react-bootstrap";

//Método para hacer post con fetch
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function RegistroPaciente(props) {
  const [nutricionista, setNutricionista] = useState("");
  const [nutricionistaId, setNutricionistaId] = useState("");
  const [nombre, setNombre] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("CC");
  const [documento, setDocumento] = useState("");
  const [sexo, setSexo] = useState("Femenino");
  const [edad, setEdad] = useState(0);
  const [estatura, setEstatura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [cintura, setCintura] = useState(0);
  const [pantorrilla, setPantorrilla] = useState(0);
  const [brazo, setBrazo] = useState(0);

  const [medidas, setMedidas] = useState(false);

  const [nutris, setNutris] = useState([]);

  //Looks for nutricionistas
  useEffect(() => {
    postData("/user", { user: { nutri: true } }).then((data) => {
      setNutris(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let history =
      peso === "0"
        ? []
        : [
            {
              fecha: new Date(),
              peso: parseInt(peso),
            },
          ];
    let paciente = {
      user: {
        username,
        nombre,
        password,
        apellido,
        tipoDocumento,
        documento,
        sexo,
        edad,
        estatura,
        peso,
        cintura,
        pantorrilla,
        brazo,
        nutricionista,
        nutricionistaId,
        nutri: false,
        favoritos: [],
        desagradables: [],
        alergias: [],
        historial: history,
      },
    };
    console.log(paciente);
    postData("/user/new", paciente).then((data) => {
      if (data.error) {
        //avisar al usuario del error
      } else {
        paciente = { username, password };
        postData("/login", paciente).then((data) => props.setUser(data.user));
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridUserName">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridNombre">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombres"
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridApellido">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apellidos"
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridTipoDocumento">
          <Form.Label>Tipo de documento</Form.Label>
          <Form.Control
            as="select"
            required
            onChange={(e) => setTipoDocumento(e.target.value)}
          >
            <option>CC</option>
            <option>TI</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDocumento">
          <Form.Label>Número</Form.Label>
          <Form.Control
            required
            requiredtype="text"
            placeholder="Documento"
            onChange={(e) => setDocumento(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridSexo">
          <Form.Label>Sexo</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={(e) => setSexo(e.target.value)}
          >
            <option>Femenino</option>
            <option>Masculino</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEdad">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Edad"
            onChange={(e) => setEdad(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      {nutris ? (
        <Form.Row>
          <Form.Group as={Col} controlId="formGridNutricionista">
            <Form.Label>
              Seleccione el nutricionista de su preferencia{" "}
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                let index = e.target.selectedIndex;
                let el = e.target.childNodes[index];
                let id = el.getAttribute("id");
                setNutricionista(e.target.value);
                setNutricionistaId(id);
              }}
              multiple
            >
              {nutris.map((value, index) => {
                return (
                  <option key={index} id={value.username}>
                    {value.nombre} {value.apellido}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Form.Row>
      ) : (
        <></>
      )}

      {medidas ? (
        <>
          <Form.Label>Circunferencias</Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCintura">
              <Form.Label>Cintura (cm)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cintura"
                onChange={(e) => setCintura(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPantorrilla">
              <Form.Label> Pantorrilla (cm)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Pantorrilla"
                onChange={(e) => setPantorrilla(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridBrazo">
              <Form.Label> Brazo (cm)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Brazo"
                onChange={(e) => setBrazo(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridPeso">
              <Form.Label>Peso (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Peso"
                onChange={(e) => setPeso(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEstatura">
              <Form.Label>Estatura (m)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Estatura"
                onChange={(e) => setEstatura(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
        </>
      ) : (
        <></>
      )}

      <Form.Row>
        <Button
          className=" ml-sm-2 button-outline"
          variant="primary"
          type="submit"
        >
          Registrate
        </Button>
        <Button
          className=" ml-sm-2 button-outline"
          onClick={() => setMedidas(!medidas)}
        >
          Continuar con datos de medidas
        </Button>
      </Form.Row>
    </Form>
  );
}
export default RegistroPaciente;
