import { useState } from "react"

import { books as BOOK_DATA } from "./data/books"

import Books from "./components/books/Books"
import NewBook from "./components/newBook/NewBook"
import Login from "./components/auth/login/Login"

const App = () => {
  const [books, setBooks] = useState(BOOK_DATA);

  const handleAddBook = (newBook) => {

    const newBookWithId = {
      id: books[books.length - 1].id + 1,
      ...newBook,
    };
    setBooks(prevBooks => [newBookWithId, ...prevBooks])
  }

  return (
    <div className="d-flex flex-column align-items-center ">
      <h1>Book Champions</h1>
      <p>¡Bienvenidos a book champions!</p>
      <NewBook onBookAdded={handleAddBook} />
      <Books books={books} />
      {/* <Login /> */}
    </div>
  )
}

export default App
