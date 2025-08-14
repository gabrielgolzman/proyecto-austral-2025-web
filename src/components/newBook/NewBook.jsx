import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router";
import { multiColourStyles } from "./NewBook.data";
import { getAuthors } from "./NewBook.server";

const NewBook = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [authors, setAuthors] = useState([]);
    const [rating, setRating] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [available, setAvailable] = useState(false);

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

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleChangeAuthor = (authors) => {
        setAuthors(authors)
    }

    const handleChangeRating = (event) => {
        setRating(event.target.value)
    }

    const handleChangePageCount = (event) => {
        setPageCount(event.target.value)
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value)
    }

    const handleChangeAvailability = (event) => {
        setAvailable(event.target.checked)
    }

    const handleChangeSummary = (event) => {
        setSummary(event.target.value)
    }

    const handleAddBook = (event) => {
        event.preventDefault();
        const newBook = {
            title,
            authorIds: authors.map(author => author.value),
            rating: parseInt(rating),
            pagesAmount: parseInt(pageCount),
            imageUrl,
            summary,
            available
        };


        onBookAdded(newBook);
        setTitle('');
        setSummary('');
        setAuthors([]);
        setRating('');
        setPageCount('');
        setImageUrl('');
        setAvailable(false);
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
                                    onChange={handleChangeTitle}
                                    value={title}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Select
                                    placeholder="No hay autores seleccionados"
                                    isMulti
                                    onChange={handleChangeAuthor}
                                    name="authors"
                                    options={authorOptions}
                                    value={authors}
                                    styles={multiColourStyles}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="summary">
                                <Form.Label>Resumen</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Ingresa un resumen del libro" onChange={handleChangeSummary} value={summary} />
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
                                    onChange={handleChangeRating}
                                    value={rating}
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
                                    onChange={handleChangePageCount}
                                    value={pageCount}

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
                                onChange={handleChangeImageUrl}
                                value={imageUrl}
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
                                onChange={handleChangeAvailability}
                                checked={available}

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