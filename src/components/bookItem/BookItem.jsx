import { Badge, Card, Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons"

import './bookItem.css';

const BookItem = ({
    id,
    title,
    author,
    rating,
    pageCount,
    imageUrl,
    available = false,
    onBookSelected,
    onDelete
}) => {

    const handleSelectBook = () => {
        onBookSelected(title);
    }

    const handleDeleteBook = () => {
        onDelete(id, title)
    }

    const filledStars = Array.from({ length: Math.min(rating, 5) }, (_, i) =>
        (<StarFill key={`filled-${i}`} color="#FFC107" />));

    const emptyStars = Array.from({ length: 5 - Math.min(rating, 5) }, (_, i) =>
        (<Star key={`empty-${i}`} color="#FFC107" />));

    return (
        <Card className="book-container mx-3 mb-2">
            <Card.Img
                height={400}
                src={imageUrl ?? '#'}
                variant="top"
            />
            <Card.Body>
                <div className="mb-2">
                    {available ?
                        <Badge bg="success">Disponible</Badge>
                        : <Badge bg="danger">Reservado</Badge>
                    }
                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
                <div className="rating-stars">
                    {filledStars}
                    {emptyStars}
                </div>
                <p>{pageCount} páginas</p>
                <p>{available ? "Disponible" : "No disponible"}</p>
                <Button variant="danger" className="me-2" onClick={handleDeleteBook}>Eliminar libro</Button>
                <Button onClick={handleSelectBook}>Seleccionar libro</Button>
            </Card.Body>
        </Card>
    )
}

export default BookItem;