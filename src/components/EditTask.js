import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [courseName, setCourseName] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("");

    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}`);
            const task = response.data;
            setCourseName(task.course_name);
            setTaskName(task.task_name);
            setDescription(task.description);
            setDeadline(task.deadline);
            setStatus(task.status);
        } catch (error) {
            console.error("Failed to fetch task:", error);
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, {
                course_name: courseName,
                task_name: taskName,
                description,
                deadline,
                status,
            });
            navigate("/tasks");
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);

    
    const handleFocus = (e) => {
        e.target.classList.remove("text-center");
        e.target.classList.add("text-left");
    };

    const handleBlur = (e) => {
        e.target.classList.remove("text-left");
        e.target.classList.add("text-center");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Task</h1>

                <div className="mb-4">
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full p-2 border rounded text-center"
                        placeholder="Course Name"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full p-2 border rounded text-center"
                        placeholder="Task Name"
                    />
                </div>

                <div className="mb-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full p-2 border rounded text-center"
                        placeholder="Description"
                    />
                </div>

                <div className="mb-4 relative">
                    <input
                        type="text"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full p-2 border rounded text-center"
                        placeholder="dd/mm/yyyy"
                        pattern="\d{2}/\d{2}/\d{4}" // Validasi format tanggal
                        title="Tanggal harus dalam format dd/mm/yyyy"
                    />
                </div>

                <div className="mb-6">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded text-center"
                    >
                        <option value="uncompleted">Uncompleted</option>
                        <option value="failed">Failed</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                    >
                        Perbarui List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
