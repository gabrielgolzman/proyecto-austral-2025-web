import { Form } from "react-bootstrap"

const BookSearch = ({ onSearch, search }) => {

    const handleSearch = (event) => {
        onSearch(event.target.value);
    }
    return (
        <Form.Group className="mb-3" controlId="searchBook">
            <Form.Control
                type="text"
                placeholder="Buscar libro..."
                onChange={handleSearch}
                value={search} />
        </Form.Group>
    )
}

export default BookSearch