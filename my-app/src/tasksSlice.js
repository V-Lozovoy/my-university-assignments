import {createSlice} from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        taskInput: '',
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload];
            state.taskInput = '';
        },
        editTask: (state, action) => {
            const {index, editedTask} = action.payload;
            state.tasks[index] = editedTask;
        },
        deleteTask: (state, action) => {
            const index = action.payload.index;
            state.tasks = state.tasks.filter((_, i) => i !== index);
        },
        completeTask: (state, action) => {
            const index = action.payload.index;
            state.tasks[index] = `✔︎︎ ${state.tasks[index]}`;
        },
        setTask: (state, action) => {
            state.taskInput = action.payload;
        },
    },
});

export const {addTask, editTask, deleteTask, completeTask, setTask} = tasksSlice.actions;
export default tasksSlice.reducer;