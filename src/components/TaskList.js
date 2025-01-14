import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
                setTasks(tasks.filter((task) => task.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <button
                onClick={() => navigate('/add')}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            >
                Tambah list
            </button>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Nama Matakuliah</th>
                        <th className="border px-4 py-2">tugas</th>
                        <th className="border px-4 py-2">Deskripsi</th>
                        <th className="border px-4 py-2">Status Tugas</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td className="border px-4 py-2">{task.course_name}</td>
                            <td className="border px-4 py-2">{task.task_name}</td>
                            <td className="border px-4 py-2">{task.description}</td>
                            <td className="border px-4 py-2">{task.status}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => navigate(`/edit/${task.id}`)}
                                    className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
