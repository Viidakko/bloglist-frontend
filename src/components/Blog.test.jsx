import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('renders title and author when button is not pressed', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://testurl.com',
        likes: 5
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Test blog by Test author', { exact: false })
    expect(element).toBeInTheDocument()

    const url = screen.getByText('http://testurl.com', { exact: false })
    expect(url).not.toBeVisible()

    const likes = screen.getByText('Likes: ', { exact: false })
    expect(likes).not.toBeVisible()
})

test('renders all content when button is pressed', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://testurl.com',
        likes: 5
    }

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('http://testurl.com', { exact: false })
    expect(url).toBeVisible()

    const likes = screen.getByText('Likes: ', { exact: false })
    expect(likes).toBeVisible()
})

test('pressing like 2 times calls like twice', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://testurl.com',
        likes: 5
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} like={mockHandler} />)

    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('BlogForm calls createBlog with correct information when form is submitted', async () => {
    const mockHandler = vi.fn()

    render(<BlogForm createBlog={mockHandler} />)

    const user = userEvent.setup()

    const inputs = screen.getAllByDisplayValue('')

    await user.type(inputs[0], 'Test Blog Title')
    await user.type(inputs[1], 'Test Author')
    await user.type(inputs[2], 'http://example.com')

    const button = screen.getByText('add')
    await user.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://example.com'
    })
})
