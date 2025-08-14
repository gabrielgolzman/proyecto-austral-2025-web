import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router";
import { initialForm, multiColourStyles } from "./NewBook.data";
import { getAuthors } from "./NewBook.server";

const NewBook = ({ onBookAdded }) => {
    const [form, setForm] = useState(initialForm);


    const [authorOptions, setAuthorOptions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAuthors(
            (data) => {
                setAuthorOptions([...data.result.map(author => ({
                    value: author.id,
                    label: author.name
                }))])
            },
            () => {

            })
    }, [])

    const handleChangeField = (newForm) => {
        setForm(prevForm => ({
            ...prevForm,
            ...newForm
        }))
    }

    const handleAddBook = (event) => {
        event.preventDefault();
        const newBook = {
            title: form.title,
            authorIds: form.authors.map(author => author.value),
            rating: parseInt(form.rating),
            pagesAmount: parseInt(form.pageAmount),
            imageUrl: form.imageUrl,
            summary: form.summary,
            available: form.isAvailable
        };

        onBookAdded(newBook);
        setForm(initialForm)
    }

    const handleGoBack = () => {
        navigate("/library");
    }

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={handleAddBook} >
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título"
                                    onChange={(event) => handleChangeField({ title: event.target.value })}
                                    value={form.title}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Select
                                    placeholder="No hay autores seleccionados"
                                    isMulti
                                    onChange={(authors) => handleChangeField({ authors })}
                                    name="authors"
                                    options={authorOptions}
                                    value={form.authors}
                                    styles={multiColourStyles}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="summary">
                                <Form.Label>Resumen</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingresa un resumen del libro"
                                    onChange={(event) => handleChangeField({ summary: event.target.value })}
                                    value={form.summary} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    onChange={(event) => handleChangeField({ rating: event.target.value })}
                                    value={form.rating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    onChange={(event) => handleChangeField({ pageAmount: event.target.value })}
                                    value={form.pageAmount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresar url de imagen"
                                onChange={(event) => handleChangeField({ imageUrl: event.target.value })}
                                value={form.imageUrl}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                onChange={(event) => handleChangeField({ isAvailable: event.target.checked })}
                                checked={form.isAvailable}
                            />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button className="me-3"
                                    onClick={handleGoBack}
                                    variant="secondary"
                                    type="button">
                                    Volver
                                </Button>
                                <Button variant="primary" type="submit">
                                    Agregar lectura
                                </Button>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default NewBook;