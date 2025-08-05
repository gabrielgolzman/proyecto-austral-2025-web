export const getBooks = (onSuccess, onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/book`)
        .then(res => res.json())
        .then(onSuccess)
        .catch(onError)
}

export const addBook = (rq, onSuccess, onError) => {
    const { title, authorIds, rating, pagesAmount, imageUrl, summary, isAvailable } = rq;
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/book`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            title,
            authorIds,
            rating,
            pagesAmount,
            imageUrl,
            summary,
            isAvailable
        })
    })
        .then(res => res.json())
        .then(onSuccess)
        .catch(onError)

}

export const deleteBook = (bookId, onSuccess, onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/book/${bookId}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    })
        .then(onSuccess)
        .catch(onError)
}