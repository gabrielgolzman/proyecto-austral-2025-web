export const getAuthors = (onSuccess, onError) => {
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/author`)
        .then(res => res.json())
        .then(onSuccess)
        .catch(onError)
}