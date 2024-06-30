import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { v4 as uuidv4 } from 'uuid';

const TaskInput = () => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() && date.trim()) {
            dispatch(addTask({ id: uuidv4(), text: task, date }));
            setTask('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit" style={{width:'30%'}}>Add Task</button>
        </form>
    );
};

export default TaskInput;
