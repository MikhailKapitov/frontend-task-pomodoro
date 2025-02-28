import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TaskWrapper from './TaskWrapper';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currFilter, setCurrFilter] = useState('all');

  const addTask = () => {
    setTasks([...tasks, {
      id: uuidv4(),
      title: 'New task',
      description: '',
      deadline: '',
      isCompleted: false,
      isRunning: false,
      isWorkPhase: true,
    }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (currFilter === 'completed') return task.isCompleted;
    if (currFilter === 'active') return !task.isCompleted;
    return true;
  });

  return (
    <>
      <header className="header">
        <div className="header-control">
          <button className="add-task-button" onClick={addTask}>
            ➕
          </button>
        </div>
        <div className="header-filter">
          <button className="filter-all" onClick={() => setCurrFilter("all")}>
            All
          </button>
          <button className="filter-completed" onClick={() => setCurrFilter("completed")}>
            Completed Only
          </button>
          <button className="filter-running" onClick={() => setCurrFilter("active")}>
            Active Only
          </button>
        </div>
      </header>

      <content id="content">
        {filteredTasks.map(task => (
          <TaskWrapper
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={(updatedTask) => {
              setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
            }}
          />
        ))}
      </content>

      {}
      <footer className="footer">
        🍅 MAN 🍅 Pomodoro 🍅
        <br></br>
        Lorem ipsum dolor sit amet!
      </footer>
    </>
  );
}