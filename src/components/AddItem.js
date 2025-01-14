import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/items', {
                name,
                description,
            });
            alert('Item added successfully!');
            setName('');
            setDescription('');
        } catch (error) {
            console.error(error);
            alert('Failed to add item.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Item</h1>
            <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 w-full"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Item
            </button>
        </form>
    );
};

export default AddItem;
