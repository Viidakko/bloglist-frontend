import { useState } from "react"

const Blog = ({ blog }) => {
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

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
            </div>
            <div style={showWhenVisible}>
                <p>{blog.url}</p>
                Likes: {blog.likes} <button>like</button> 
                <p>{blog.author}</p>
            </div>
        </div> 
    )
}

export default Blog