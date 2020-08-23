import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import dotenv from "dotenv";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// dotenv.config();

function App() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [apod, setApod] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=CgxhAyMNHBCjyaXaTjIcI4f3f9lR3a3GDJSDLTNy`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        setApod(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setApod(e.response.data);
        setIsLoading(false);
      });
  }, [date]);

  const onChangeHandler = (e) => {
    setDate(e.target.value);
  };

  return (
    <Container fluid className="App">
      <Row className="mt-3 mb-3">
        <Col>
          <input onChange={onChangeHandler} type="date" value={date} />
        </Col>
      </Row>
      {apod.code ? (
        <Row>
          <Col>
            <h1>{apod.msg}</h1>
          </Col>
        </Row>
      ) : (
        <Row>
          {isLoading ? (
            <Col>
              <h1>Data is loading...</h1>
            </Col>
          ) : (
            <Col>
              <h1>{apod.title}</h1>
              <p>{apod.explanation}</p>
              <img src={apod.url} alt={apod.title} />
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
}

export default App;
