import { useState } from "react"

const Blog = ({ blog, like, deleteBlog, currentUser }) => {
    const [visible, setVisible] = useState(false)
    
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showWhenVisible = { display: visible ? '' : 'none' }
    const showRemoveButton = blog.user?.id !== currentUser.id

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = () => {
        blog.likes += 1
        like(blog)
    }

    const remove = () => {
        deleteBlog(blog.id)
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
                {showRemoveButton && <button onClick={remove}>Remove</button>}
            </div>
        </div> 
    )
}

export default Blog