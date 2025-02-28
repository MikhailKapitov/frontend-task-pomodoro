import { useState } from 'react';
import Timer from './Timer';

export default function TaskWrapper({ task, onDelete, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);

  const toggleCompleted = () => {
    onUpdate({ ...task, isCompleted: !task.isCompleted });
  };

  return (
    <div className={"task-wrapper"}>
      <div className={`task ${task.isCompleted ? 'task-completed' : 'task-running'}`}>
        <input
          type="text"
          placeholder="Your task's name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => onUpdate({ ...task, title })}
        />
        <div className="task-status-bar">
          <a className="task-status-text">
            {task.isCompleted ? 'Completed' : 'Active'}
          </a>
          <button className="task-status-button" onClick={toggleCompleted}>
            🏁
          </button>
        </div>
        <input
          type="text"
          placeholder="Your task's description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => onUpdate({ ...task, description })}
        />
        <input
          type="text"
          placeholder="Your task's deadline..."
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          onBlur={() => onUpdate({ ...task, deadline })}
        />
      </div>
      
      <Timer task={task} onUpdate={onUpdate} />
      
      <div className="task-control">
        <button onClick={() => onDelete(task.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}