import { useState } from "react"

const Blog = ({ blog, like }) => {
    const [visible, setVisible] = useState(false)
    
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = () => {
        blog.likes += 1
        like(blog)
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} by {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
            </div>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                Likes: {blog.likes} <button onClick={addLike}>like</button>
                <p>Added by: {blog.user?.name || 'unknown user'}</p>
            </div>
        </div> 
    )
}

export default Blog