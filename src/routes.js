import {addBookHandler, getAllBooks} from './handler.mjs'

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
    }
]

export {routes}