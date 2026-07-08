const LogoutForm = ({ user, handleLogout }) => {
    return (
        <form onSubmit={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
            <p>{user.name} logged in</p>
            <button type='submit'>Logout</button>
        </form>
    )
}

export default LogoutForm