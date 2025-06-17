import { useEffect, useState } from "react";

import Books from "../books/Books"
import NewBook from "../newBook/NewBook"
import { Button, Col, Row } from "react-bootstrap";

const Dashboard = ({ onLogout }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log("Dashboard triggered effect")

        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(data => {
                setBooks([...data])
                // setBooks(data.map(book => ({
                //     id: book.id,
                //     title: book.title,
                //     author: book.author.name,
                //     pageCount: 100,
                //     rating: 5,
                //     imageUrl: null,
                //     available: true
                // })))
            })
            .catch(err => console.log(err))
    }, [])


    const handleAddBook = (newBook) => {
        const newBookWithId = {
            id: books[books.length - 1].id + 1,
            ...newBook,
        };
        fetch("http://localhost:3000/books", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer `
            },
            method: "POST",
            body: JSON.stringify({
                title: newBook.title
            })
        })
            .then(res => res.json())
            .then(() => {
                setBooks(prevBooks => [newBookWithId, ...prevBooks]);
            })
            .catch(err => console.log(err))

    }

    const handleDeleteBook = (id) => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
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