import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();

    const [courseName, setCourseName] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('uncompleted');
    const [message, setMessage] = useState('');
    const [focusedField, setFocusedField] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/tasks', {
                course_name: courseName,
                task_name: taskName,
                description,
                deadline,
                status,
            });
            setMessage('Tugas Berhasil Ditambahkan');
            setTimeout(() => navigate('/tasks'), 2000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to add task.');
        }
    };

    const getPlaceholder = (field) => {
        if (focusedField === field || eval(field)) return ''; 
        if (field === 'courseName') return 'Course Name';
        if (field === 'taskName') return 'Task Name';
        if (field === 'description') return 'Description';
        if (field === 'deadline') return 'Deadline';
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <button
                onClick={() => navigate('/')}
                className="self-start mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Kembali ke Task List
            </button>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Add Task</h1>
                {message && <p className="text-green-500 mb-4 text-center">{message}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        onFocus={() => setFocusedField('courseName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={getPlaceholder('courseName')}
                        className={`w-full p-2 border rounded ${
                            courseName || focusedField === 'courseName'
                                ? 'text-left'
                                : 'text-center'
                        }`}
                        required
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        onFocus={() => setFocusedField('taskName')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={getPlaceholder('taskName')}
                        className={`w-full p-2 border rounded ${
                            taskName || focusedField === 'taskName'
                                ? 'text-left'
                                : 'text-center'
                        }`}
                        required
                    />
                </div>

                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setFocusedField('description')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={getPlaceholder('description')}
                        className={`w-full p-2 border rounded ${
                            description || focusedField === 'description'
                                ? 'text-left'
                                : 'text-center'
                        }`}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className={`w-full p-2 border rounded ${
                            deadline || focusedField === 'deadline'? 'text-left': 'text-center'
                        }`}
                        required
                    />
                </div>

                <div className="mb-6">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded text-center"
                        required
                    >
                        <option value="uncompleted">Uncompleted</option>
                        <option value="failed">Failed</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                        Tambahkan list
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
