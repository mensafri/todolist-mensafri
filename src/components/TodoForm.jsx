'use client'
import { useState } from 'react';
import addTodo from "@/server-actions/addTodo";

export default function TodoForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false); // State untuk menangani loading

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.target;
        const formData = new FormData(formElement);
        setLoading(true); // Set loading menjadi true saat formulir disubmit
        try {
            // Panggil addTodo action
            await addTodo(formData);
            // Reset form inputs
            setFormData({
                title: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding todo:', error);
        } finally {
            setLoading(false); // Set loading kembali ke false setelah selesai
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label htmlFor="title" className="block text-white mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-white mb-2">
                    Description
                </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded"
                disabled={loading} // Menonaktifkan tombol saat loading
            >
                {loading ? 'Adding...' : 'Add Todo'} {/* Teks tombol disesuaikan dengan status loading */}
            </button>
        </form>
    );
}
