import {addBookHandler, getAllBooks, getBookById} from './handler.mjs'

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
        path : '/books/{bookid}',
        handler : getBookById
    }
]

export {routes}