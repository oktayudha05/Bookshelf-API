import {books} from './books.js'
import { nanoid } from 'nanoid'

const addBookHandler = (request, h) => {
    const {name, author, year, summary, publisher, pageCount, readPage, reading} = request.payload
    const id = nanoid(15)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()

    if (!name) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    else if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    const newBook = {
        name, author, year, summary, publisher, pageCount, readPage, reading, finished, insertedAt, id
    }

    books.push(newBook)

    const isSuccess = books.filter(book => book.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data : {
                bookId : id
            }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status : 'error',
        message : 'Buku gagal ditambahkan'
    })
    response.code(500)
    return response
}

const getAllBooks = (request, h) => {
    const response = h.response({
        status : 'success',
        data : books.map(book => ({
            id : book.id,
            name : book.name,
            publisher : book.publisher,
        }))
    })
    response.code(200)
    return response
}

export {addBookHandler, getAllBooks}