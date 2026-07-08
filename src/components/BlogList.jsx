import Blog from "./Blog"

const BlogList = ({ blogs, like }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} like={like} />
            )}
        </div>
    )
}

export default BlogList