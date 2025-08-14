import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        username: false
    })

    const usernameRef = useRef(null)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            username: false,
        }))

    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false,
        }))

    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: false,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // onLogin();
        navigate("/library")
    }

    const handleLoginClick = () => {
        navigate("/login")
    }

    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Bienvenidos a Books Champion!</h5>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            className={errors.email ? "border border-danger" : ""}
                            type="text"
                            placeholder="Ingresar nombre de usuario"
                            onChange={handleChangeUsername}
                            value={username}
                            ref={usernameRef}
                        />
                        {errors.username &&
                            <p className="text-danger mt-2">Debe completar el campo nombre de usuario</p>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className={errors.email ? "border border-danger" : ""}
                            type="text"
                            placeholder="Ingresar email"
                            onChange={handleChangeEmail}
                            value={email}
                            ref={emailRef}
                        />
                        {errors.email &&
                            <p className="text-danger mt-2">Debe completar el campo email</p>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Label>Conraseña</Form.Label>
                        <Form.Control
                            className={errors.password && "border border-danger"}
                            type="password"
                            placeholder="Ingresar contraseña"
                            onChange={handleChangePassword}
                            value={password}
                            ref={passwordRef}
                        />
                        {errors.password &&
                            <p className="text-danger mt-2">Debe completar el campo contraseña</p>}
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={handleLoginClick} >Iniciar sesión</Button>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Registrarse
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Register