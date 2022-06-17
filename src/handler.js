import {books} from './books.js'
import { nanoid } from 'nanoid'

const addBookHandler = (request, h) => {
    const {name, author, year, summary, publisher, pageCount, readPage, reading} = request.payload
    const id = nanoid(15)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updateAt = insertedAt

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
        name, author, year, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updateAt, id
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
    let name = request.query.name
    const reading = request.query.reading
    const finished = request.query.finished

    if (name) {
        name = name.toLowerCase().replace(/[""]+/g, '')
        const book = books.filter(book => book.name.toLowerCase().includes(name))

        const response = h.response({
            status : 'success',
            data : book.map(book => ({
                name : book.name,
                publisher : book.publisher,
                id : book.id,
            }))
        })
        response.code(200)
        return response
    } 
    if (reading == 1) {
        const book = books.filter(book => book.reading == true)

        const response = h.response({
            status : 'success',
            data : book.map(book => ({
                name : book.name,
                publisher : book.publisher,
                id : book.id,
            }))
        })
        response.code(200)
        return response
    } else if (reading == 0) {
        const book = books.filter(book => book.reading == false)

        const response = h.response({
            status : 'success',
            data : book.map(book => ({
                name : book.name,
                publisher : book.publisher,
                id : book.id,
            }))
        })
        response.code(200)
        return response
    } 
    if (finished == 1) {
        const book = books.filter(book => book.finished == true)

        const response = h.response({
            status : 'success',
            data : book.map(book => ({
                name : book.name,
                publisher : book.publisher,
                id : book.id,
            }))
        })
        response.code(200)
        return response
    } else if (finished == 0) {
        const book = books.filter(book => book.finished == false)

        const response = h.response({
            status : 'success',
            data : book.map(book => ({
                name : book.name,
                publisher : book.publisher,
                id : book.id,
            }))
        })
        response.code(200)
        return response
    }
    
    const response = h.response({
        status : 'success',
        data : books.map(book => ({
            name : book.name,
            publisher : book.publisher,
            id : book.id,
        }))
    })
    response.code(200)
    return response
}

const getBookById = (request, h) => {
    const {bookId} = request.params

    const book = books.filter(book => book.id === bookId)
    if (book[0] !== undefined) {
        const response = h.response({
            status : 'success',
            data : book
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
}

const updateBook = (request, h) => {
    const {name, year, author, publisher, summary, pageCount, readPage, reading} = request.payload
    const {bookId} = request.params
    const index = books.findIndex(book => bookId === book.id)
    const updateAt = new Date().toISOString()

    if (!name) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        response.code(400)
        return response
    } else if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response
    } else if (index == -1) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        response.code(404)
        return response
    }
    const newBook = {
        ...books[index],
        name, year, author, publisher, summary, pageCount, readPage, reading, updateAt,
    }
    books.splice(index, 1, newBook)
    const response = h.response({
        status : 'success',
        message : 'Buku berhasil diperbarui',
    })
    response.code(200)
    console.log(books);
    return response
}

const deleteBook = (request, h) => {
    const {bookId} = request.params
    const index = books.findIndex(book => book.id === bookId)

    if (index !== -1) {
        books.splice(index, 1)
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil dihapus',
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id tidak ditemukan',
    })
    response.code(404)
    return response
}

export {addBookHandler, getAllBooks, getBookById, updateBook, deleteBook}