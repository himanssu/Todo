import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../redux/actions/taskActions';
import './tasklist.css';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    const handleEdit = (task) => {
        setEditId(task.id);
        setUpdatedTask(task.text);
        setUpdatedDate(task.date);
    };

    const handleUpdate = (taskId) => {
        dispatch(editTask(taskId, { text: updatedTask, date: updatedDate }));
        setEditId(null);
        setUpdatedTask('');
        setUpdatedDate('');
    };

    const handleToggle = (taskId) => {
        dispatch(toggleTask(taskId));
    };

    const calculateDaysLeft = (date) => {
        const taskDate = new Date(date);
        const today = new Date();
        const timeDiff = taskDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    console.log(tasks);

    return (
        <ul>
            {tasks?.map((task) => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                    {editId === task.id ? (
                        <div>
                            <input
                                type="text"
                                value={updatedTask}
                                onChange={(e) => setUpdatedTask(e.target.value)}
                            />
                            <input
                                type="date"
                                value={updatedDate}
                                onChange={(e) => setUpdatedDate(e.target.value)}
                            />
                            <button onClick={() => handleUpdate(task.id)}>Update</button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggle(task.id)}
                                />
                                {task.text} - {task.date} ({calculateDaysLeft(task.date)} days left)
                            </div>
                            <div className="buttons">
                                <button className="edit" onClick={() => handleEdit(task)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
