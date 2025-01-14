import React from 'react';
import axios from 'axios';

const DeleteItem = ({ itemId, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/items/${itemId}`);
                alert('Item deleted successfully!');
                onDelete(itemId);
            } catch (error) {
                console.error(error);
                alert('Failed to delete item.');
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
        >
            Delete
        </button>
    );
};

export default DeleteItem;
