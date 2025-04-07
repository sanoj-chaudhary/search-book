'use client'
import { useState,useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
export default function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const router = useRouter();
 
  const handleSearch = async () => {
    const res = await axios.get(`/api/books?query=${query}`);
    setBooks(res.data.data);
  };


  const fetchData = async () => {
    const res = await axios.get(`/api/books`);
    setBooks(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [])
 

  return (
    <div className="min-h-screen p-8 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Book Search</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => router.push('/add-book')}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          ➕ Add New
        </button>
      </div>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-72 p-2 border border-gray-300 rounded-lg shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <ul className="max-w-xl mx-auto space-y-4">
        {
        books.length>0?
        books.map((book,index) => (
          <Fragment key={index} >
          <li
            key={book.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => router.push(`/book/${book._id}`)}
          >
            <p className="text-lg text-blue-700 font-semibold">{book.title}</p>
            <p className="text-sm text-gray-600">{book.authors}</p>
          </li>
          </Fragment>
        )):
        <h1 className='bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer text-center'>Product not found</h1>
        }
      </ul>
    </div>
  );
}
