'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function AddBookPage() {
  const router = useRouter();
    const [errMsg,setErrMsg] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    isbn: '',
    thumbnailUrl: '',
    shortDescription: '',
    longDescription: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      publishedDate: { $date: new Date().toISOString() },
      status: 'PUBLISH',
      longDescription: '',
      categories: [],
    };

    const res = await axios.post('/api/books',payload);
    
    if (res.data.success) {
      router.push('/');
    }else{
        setErrMsg('Somehing went wrong')
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">➕ Add a New Book</h1>
      {
        errMsg?<h3>{errMsg}</h3>:''
      }
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="authors"
          placeholder="Authors"
          value={formData.authors}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
       
        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="longDescription"
          placeholder="Long Description"
          value={formData.longDescription}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
