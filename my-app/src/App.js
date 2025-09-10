//import logo from './logo.svg';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {addTask, editTask, deleteTask, completeTask, setTask} from './tasksSlice';

function App() {
  const dispatch = useDispatch();
  const {tasks, taskInput} = useSelector((state) => state.tasks);
  const handleAddTask = () => {
    if (taskInput && taskInput.trim() !== '') {
      dispatch(addTask(taskInput));
    }
  };
  const handleEditTask = (index, editedTask) => {
    dispatch(editTask({index, editedTask}));
  };
  const handleCompleteTask = (index) => {
    dispatch(completeTask({index}));
  };
  const handleDeleteTask = (index) => {
    dispatch(deleteTask({index}));
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>To Do List</h1>
          <input
              type="text"
              placeholder="Введіть завдання"
              value={taskInput}
              onChange={(e) => dispatch(setTask(e.target.value))}
              onClick={() => dispatch(setTask(''))}
          />

          <button onClick={handleAddTask}>Додати</button>
          <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                  {task}
                  <button onClick={() => handleEditTask(index, prompt('Редагувати', task))}>Редагувати</button>
                  <button onClick={() => handleDeleteTask(index)}>Видалити</button>
                  <button onClick={() => handleCompleteTask(index)}>Помітити</button>
                </li>
            ))}
          </ul>
        </header>
      </div>
  );
}
export default App;