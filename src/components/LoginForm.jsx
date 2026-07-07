const LoginForm = ({ submit, formUsername, formPassword, handleUserName, handlePassword }) => {
    return (
        <form onSubmit={submit}>
            <div>
                <label>
                    Username: <input
                        type="text"
                        value={formUsername}
                        onChange={handleUserName}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password: <input
                        type="password"
                        value={formPassword}
                        onChange={handlePassword}
                    />
                </label>
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm