import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/add" element={<AddTask />} />
                <Route path="/edit/:id" element={<EditTask />} />
            </Routes>
        </Router>
    );
};

export default App;
