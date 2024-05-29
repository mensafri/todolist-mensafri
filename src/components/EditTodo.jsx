'use client'

import { useState } from "react"
import updateTodo from "@/server-actions/updateTodo"

export default function EditTodo({ todo }) {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
        is_completed: todo.is_completed,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'is_completed' ? value === 'true' : value,
        }));
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                    <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
                        <span
                            className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right"
                            onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <form
                            action={updateTodo}
                            onSubmit={() => setShowModal(false)}
                            className="mt-4">
                            <input type="hidden" name="id" value={todo.id} />
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-300 mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="is_completed" className="block text-gray-300 mb-2">
                                    Is Completed
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="is_completed-true"
                                        name="is_completed"
                                        value="true"
                                        checked={formData.is_completed}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="is_completed-true"
                                        className={`cursor-pointer px-4 py-2 rounded-l-lg border ${formData.is_completed ? 'bg-green-600 text-white border-green-600' : 'bg-gray-700 text-gray-300 border-gray-600'
                                            }`}>
                                        Yes
                                    </label>
                                    <input
                                        type="radio"
                                        id="is_completed-false"
                                        name="is_completed"
                                        value="false"
                                        checked={!formData.is_completed}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="is_completed-false"
                                        className={`cursor-pointer px-4 py-2 rounded-r-lg border ${!formData.is_completed ? 'bg-red-600 text-white border-red-600' : 'bg-gray-700 text-gray-300 border-gray-600'
                                            } ml-1`}>
                                        No
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update Todo
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}