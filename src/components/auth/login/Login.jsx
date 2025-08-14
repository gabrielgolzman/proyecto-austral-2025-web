

import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import ToggleTheme from "../../shared/toggleTheme/ToggleTheme";
import AuthContainer from "../authContainer/AuthContainer";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

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
        if (!email) {
            alert("Debe ingresar un email.");
            emailRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true,
            }))
            return;
        }

        if (!password) {
            alert("Debe ingresar un password.");
            passwordRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true,
            }))
            return;
        }

        onLogin();
        navigate("/library")
    }

    const handleRegisterClick = () => {
        navigate("/register")
    }

    return (
        <AuthContainer>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
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
                    <Form.Control
                        className={errors.password && "border border-danger"}
                        type="password"
                        placeholder="Ingresar contraseña"
                        onChange={handleChangePassword}
                        value={password}
                        ref={passwordRef}
                    />
                    {errors.password &&
                        <p className="text-danger mt-2">Debe completar el campo password</p>}
                </FormGroup>
                <Row>
                    <Col />
                    <Col md={6} className="d-flex justify-content-end">
                        <Button variant="secondary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <p className="text-center fw-bold">¿No posee cuenta?</p>
                    <Button onClick={handleRegisterClick}>Registrarse</Button>
                </Row>
            </Form>
        </AuthContainer>
    );
};


export default Login;
