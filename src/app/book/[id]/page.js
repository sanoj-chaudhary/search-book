'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BookDetailPage = ({ params, searchParams }) => {
    const { id } = React.use(params);
    const [book, setBook] = useState()
    const getDetail = async (id) => {
        const res = await axios.get(`/api/books?id=${id}`);
        setBook(res.data.data)
    }
    useEffect(() => {
        getDetail(id)
    }, [])

    if (!book) {
        return <div className="p-6 text-red-500">Book not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Book Details</h1>

            <div className="bg-white p-4 rounded-lg shadow">
                <img src={book.thumbnailUrl} alt={book.title} className="w-48 h-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="text-gray-700 font-semibold mb-2">Author(s): {book.authors}</p>
                <p className="text-sm text-gray-600 mb-4">Published: {new Date(book.publishedDate.$date).toDateString()}</p>

                <p className="mb-4 text-gray-800">{book.shortDescription}</p>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Long Description</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                        {book.longDescription}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default BookDetailPage;
