import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { addBook, deleteBook } from "./Dashboard.server";

import Books from "../books/Books"
import NewBook from "../newBook/NewBook"

const Dashboard = ({ onLogout }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/book`)
            .then(res => res.json())
            .then(data => {
                setBooks([...data.result])

            })
            .catch(err => console.log(err))
    }, [])

    const handleAddBook = (newBook) => {
        addBook(newBook,
            (response) => {
                console.log(response)
                fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/book`)
                    .then(res => res.json())
                    .then(data => {
                        setBooks([...data.result])
                    })
                    .catch(err => console.log(err))
            },
            (err) => {
                console.log(err)
            }
        )

    }

    const handleDeleteBook = (id) => {
        deleteBook(id,
            () => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
            },
            (err) => {
                console.log(err)
            }
        )

    }
    return (
        <>
            <Row className="w-100">
                <Col />
                <Col md={3} className="d-flex justify-content-end m-3">
                    <Button onClick={onLogout}>Cerrar sesión</Button>
                </Col>
            </Row>
            <h1>Book Champions</h1>
            <p>¡Bienvenidos a book champions!</p>
            <NewBook onBookAdded={handleAddBook} />
            <Books books={books} onDeleteBook={handleDeleteBook} />
        </>
    )
}

export default Dashboard