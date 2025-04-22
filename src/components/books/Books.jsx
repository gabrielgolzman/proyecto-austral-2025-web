import { useState } from "react";
import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/BookSearch";

const Books = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState('');
    const [search, setSearch] = useState('');

    const handleSelectBook = (title) => {
        setSelectedBook(title);
    }

    const handleSearchChange = (searchValue) => {
        setSearch(searchValue)
    }

    const booksMapped = books
        .filter(book =>
            book.title.toLowerCase().includes(search.toLowerCase()))
        .map(book => (
            <BookItem
                key={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
                pageCount={book.pageCount}
                imageUrl={book.imageUrl}
                available={book.available}
                onBookSelected={handleSelectBook}
            />
        ))


    return (
        <>
            <BookSearch
                onSearch={handleSearchChange}
                search={search} />
            {selectedBook
                &&
                <p>Usted ha seleccionado el libro: <b>{selectedBook}</b></p>}
            <div className="d-flex justify-content-center flex-wrap">
                {booksMapped.length ?
                    booksMapped :
                    <p>No se encontraron libros</p>}
            </div>
        </>
    )
};

export default Books;