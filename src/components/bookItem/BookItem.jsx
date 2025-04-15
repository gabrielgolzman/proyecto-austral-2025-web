import { Badge, Card, Button } from "react-bootstrap";

import './bookItem.css';

const BookItem = ({
    title,
    author,
    rating,
    pageCount,
    imageUrl,
    available = false,
    onBookSelected
}) => {

    const handleSelectBook = () => {
        onBookSelected(title);
    }

    return (
        <Card className="book-container mx-3 mb-2">
            <Card.Img
                height={400}
                src={imageUrl}
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
                <p>{rating} estrella{rating > 1 ? 's' : ''}</p>
                <p>{pageCount} páginas</p>
                <p>{available ? "Disponible" : "No disponible"}</p>
                <Button onClick={handleSelectBook}>Seleccionar libro</Button>
            </Card.Body>
        </Card>
    )
}

export default BookItem;