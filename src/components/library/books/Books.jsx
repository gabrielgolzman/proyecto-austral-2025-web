import { useState } from "react";
import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/BookSearch";
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import ToastMessage from "../../shared/toastMessage/ToastMessage";

const Books = ({ books, onDeleteBook }) => {
    const [selectedBook, setSelectedBook] = useState('');
    const [search, setSearch] = useState('');
    const [bookToDelete, setBookToDelete] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSelectBook = (title) => {
        setSelectedBook(title);
    }

    const handleSearchChange = (searchValue) => {
        setSearch(searchValue)
    }

    const handleCancelModel = () => {
        setShowModal(false)
    }

    const handleHideToast = () => {
        setShowToast(false)
    }

    const handleDelete = (id, title) => {
        setBookToDelete({
            id,
            title,
        });
        setShowModal(true);
    }

    const handleDeleteConfirm = () => {
        if (bookToDelete) {
            onDeleteBook(bookToDelete.id)
            setShowModal(false);
            setShowToast(true);
            setBookToDelete(null);
        }
    }

    const booksMapped = books
        .filter(book =>
            book.title.toLowerCase().includes(search.toLowerCase()))
        .map(book => (
            <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                authors={book.authors}
                rating={book.rating}
                pagesAmount={book.pagesAmount}
                imageUrl={book.imageUrl}
                isAvaliable={book.isAvailable}
                onBookSelected={handleSelectBook}
                onDelete={handleDelete}
            />
        ))


    return (
        <>
            <DeleteModal show={showModal}
                onCancel={handleCancelModel}
                onConfirm={handleDeleteConfirm}
                bookTitle={bookToDelete?.title || ""}
            />
            <ToastMessage
                show={showToast}
                onClose={handleHideToast}
                message={"Libro eliminado correctamente"}
            />
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