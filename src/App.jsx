import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [showMessage, setShowMessage] = useState(null)
    const [isErrormessage, setErrorMessage] = useState(false)

    const blogFormRef = useRef()

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

    const handleLogin = async (loginUser) => {
        const username = loginUser.username
        const password = loginUser.password
        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
        }
        catch (error) {
            setErrorMessage(true)
            setShowMessage(error.response.data.error)
            setTimeout(() => {setShowMessage(null)} , 5000)
        }
    }

    const handleLogout = async event => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const handleNewBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create(blogObject)
            const newList = blogs.concat(blog)
            setBlogs(newList)
            setErrorMessage(false)
            setShowMessage(`Added a new blog: ${blog.title} by ${blog.author}`)
            setTimeout(() => {setShowMessage(null)} , 3000)
        }
        catch (error) {
            setErrorMessage(true)
            setShowMessage(error.response.data.error)
            setTimeout(() => {setShowMessage(null)} , 5000)
        }
    }

    const handleLike = async (blogObject) => {
        try {
            const blog = await blogService.update(blogObject.id, blogObject)
            setBlogs(blogs.map(b => b.title !== blogObject ? b : blog))
        }
        catch (error) {
            setErrorMessage(true)
            setShowMessage(error.response.data.error)
            setTimeout(() => {setShowMessage(null)} , 5000)
        }
    }

    const handleDelete = async (id) => {
        try {
            const blog = blogs.find(b => b.id === id)
            if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)){
                setErrorMessage(false)
                setShowMessage(`Deleted ${blog.title} by ${blog.author}`)
                setTimeout(() => {setShowMessage(null)} , 3000)
                await blogService.destroy(id)
                setBlogs(blogs.filter(b => b.id !== id))
            }
        }
        catch (error) {
            setErrorMessage(true)
            setShowMessage(error.response.data.error)
            setTimeout(() => {setShowMessage(null)} , 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={showMessage} error={isErrormessage}/>
                <LoginForm login={handleLogin}/>
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={showMessage} error={isErrormessage}/>
            <LogoutForm user={user} handleLogout={handleLogout}/>
            <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm createBlog={handleNewBlog}/>
            </Togglable>
            <BlogList blogs={blogs} like={handleLike} deleteBlog={handleDelete} currentUser={user}/>
        </div>
    )
}

export default App