import React from 'react';
import { Provider } from 'react-redux';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import store from './redux/store';
import './App.css';


const App = () => {
    
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Just Do it</h1>
                <div className="floating-window">
                    <TaskInput />
                    <TaskList />
                </div>
            </div>
        </Provider>
    );
};

export default App;
