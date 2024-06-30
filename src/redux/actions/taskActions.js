import { ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK } from './types';

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
});

export const editTask = (taskId, updatedTask) => ({
    type: EDIT_TASK,
    payload: { taskId, updatedTask },
});

export const toggleTask = (taskId) => ({
    type: TOGGLE_TASK,
    payload: taskId,
});
