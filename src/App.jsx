import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs( blogs )
        })
    }, [])

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch {
            console.error('wrong credentials')
        }
    }

    const handleLogout = async event => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }


    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>
                            Username
                            <input
                                type='text'
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input
                                type='password'
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </label>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                <form onSubmit={handleLogout} style={{display: 'flex', alignItems: 'center'}}>
                    <p>{user.name} logged in</p>
                    <button type='submit'>Logout</button>
                </form>
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App