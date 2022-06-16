import {addBookHandler, getAllBooks, getBookById} from './handler.js'

const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : addBookHandler
    },
    {
        method : 'GET',
        path : '/books',
        handler : getAllBooks
    },
    {
        method : 'GET',
        path : '/books/{bookId}',
        handler : getBookById
    }
]

export {routes}