import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { multiColourStyles } from "./NewBook.data";

const NewBook = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [rating, setRating] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [available, setAvailable] = useState(false);

    const [authorOptions, setAuthorOptions] = useState([])

    useEffect(() => {
        fetch("https://localhost:7120/api/author")
            .then(res => res.json())
            .then(data => {
                setAuthorOptions([...data.result.map(author => ({
                    value: author.id,
                    label: author.name
                }))])

            })
            .catch(err => console.log(err))
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

    const handleAddBook = (event) => {
        event.preventDefault();
        const newBook = {
            title,
            authors,
            rating,
            pageCount,
            imageUrl,
            available
        };

        onBookAdded(newBook);
        setTitle('');
        setAuthors([]);
        setRating('');
        setPageCount('');
        setImageUrl('');
        setAvailable(false);
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
                            <Button variant="primary" type="submit">
                                Agregar lectura
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default NewBook;