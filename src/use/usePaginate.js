import React, { useState, useEffect } from 'react'
import TodoService from '../services/TodoService'
import { Pagination } from 'react-bootstrap'

const usePaginate = (page, setPage) => {
    const [pagination] = useState({ page, next: true, prev: false })

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        pagination.page = page
        pagination.prev = page !== 1

        TodoService.getTodos(page + 1).then(resp => {
            pagination.next = !resp.data.length ? false : true
        })
    }, [page])

    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.Item onClick={prevPage} disabled={!pagination.prev}>&lt;</Pagination.Item>
                <Pagination.Item active>{pagination.page}</Pagination.Item>
                <Pagination.Item onClick={nextPage} disabled={!pagination.next}>&gt;</Pagination.Item>
            </Pagination>
        </div>
    )
}

export default usePaginate
