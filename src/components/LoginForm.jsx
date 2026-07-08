import { useState } from 'react'

const LoginForm = ({ login }) => {
    const [newUsername, setUsername] = useState('')
    const [newPassword, setPassword] = useState('')

    const createLogin = (event) => {
        event.preventDefault()
        login({
            username: newUsername,
            password: newPassword
        })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={createLogin}>
            <div>
                <label>
                    Username: <input
                        type="text"
                        value={newUsername}
                        onChange={event => setUsername(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password: <input
                        type="password"
                        value={newPassword}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm