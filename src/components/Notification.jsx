const Notification = ({ message, error }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 26,
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 26,
        borderStyle: 'solid',
        borderRadius: '5',
        padding: '10',
        marginBottom: '10'
    }

    if (message === null) {
        return null
    }
    else if (error) {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification