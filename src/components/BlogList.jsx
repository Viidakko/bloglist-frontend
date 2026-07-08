import Blog from "./Blog"

const BlogList = ({ blogs, like, deleteBlog, currentUser }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} like={like} deleteBlog={deleteBlog} currentUser={currentUser} />
            )}
        </div>
    )
}

export default BlogList