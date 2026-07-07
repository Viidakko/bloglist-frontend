import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newTitle, setTitle] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newUrl, setUrl] = useState('')

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
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
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

    const handleNewBlog = async event => {
        event.preventDefault()
        try {
            const blogObject = {
                title: newTitle,
                author: newAuthor,
                url: newUrl
            }
            const blog = await blogService.create(blogObject)
            const newList = blogs.concat(blog)
            setBlogs(newList)
            setTitle('')
            setAuthor('')
            setUrl('')
        }
        catch {
            console.error('Adding blog failed')
        }
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
            <div>
                <h2>Create new</h2>
                <form onSubmit={handleNewBlog}>
                    <div>
                        <label>
                            Title:
                            <input
                                type='text'
                                value={newTitle}
                                onChange={({ target }) => setTitle(target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Author:
                            <input
                                type='text'
                                value={newAuthor}
                                onChange={({ target }) => setAuthor(target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Url:
                            <input
                                type='text'
                                value={newUrl}
                                onChange={({ target }) => setUrl(target.value)}
                            />
                        </label>
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App