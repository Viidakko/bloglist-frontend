import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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