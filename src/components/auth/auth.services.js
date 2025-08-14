export const login = (rq, onSuccess, onError) => {
    const { email, password } = rq;
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/authentication/login`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json())
        .then(onSuccess)
        .catch(onError)

}

export const register = (rq, onSuccess, onError) => {
    const { username, email, password } = rq;
    fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/api/authentication/register`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
        .then(res => res.json())
        .then(onSuccess)
        .catch(onError)

}