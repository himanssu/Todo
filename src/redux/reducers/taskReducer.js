import { ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK } from '../actions/types';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('tasks');
        if (serializedState === null) {
            return { tasks: [] }; // Ensure tasks is always an array
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { tasks: [] }; // Ensure tasks is always an array
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasks', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const initialState = loadState();
if (!initialState.tasks) {
    initialState.tasks = [];
}


const taskReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_TASK:
            newState = {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
            saveState(newState);
            return newState;
        case DELETE_TASK:
            newState = {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
            saveState(newState);
            return newState;
        case EDIT_TASK:
            newState = {
                ...state,
                tasks: state.tasks.map(task => 
                    task.id === action.payload.taskId 
                    ? { ...task, text: action.payload.updatedTask.text, date: action.payload.updatedTask.date }
                    : task
                ),
            };
            saveState(newState);
            return newState;
        case TOGGLE_TASK:
            newState = {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };
            saveState(newState);
            return newState;
        default:
            return state;
    }
};

export default taskReducer;
