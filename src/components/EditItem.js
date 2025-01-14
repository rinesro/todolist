import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/items/${id}`)
            .then((response) => {
                const { name, description } = response.data;
                setName(name);
                setDescription(description);
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/items/${id}`, {
                name,
                description,
            });
            alert('Item updated successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to update item.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
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
                Update Item
            </button>
        </form>
    );
};

export default EditItem;
