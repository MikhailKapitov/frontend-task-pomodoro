import { useEffect, useState } from 'react';

const WORK_DURATION = 25 * 60;
const REST_DURATION = 5 * 60;

export default function Timer({ task, onUpdate }) {
  const [timeLeft, setTimeLeft] = useState(task.isWorkPhase ? WORK_DURATION : REST_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onUpdate({ ...task, isWorkPhase: !task.isWorkPhase });
            return task.isWorkPhase ? REST_DURATION : WORK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, task.isWorkPhase]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className={`timer ${isRunning ? 'timer-running' : 'timer-paused'} ${task.isWorkPhase ? 'timer-working' : 'timer-resting'}`}>
      <div className="timer-timer">
        {formatTime(timeLeft)}
      </div>
      <div className="timer-status-text">
        {task.isWorkPhase ? 'Work!!!' : 'Rest!!!'}
      </div>
      <button className="timer-button"
        onClick={() => {
          setIsRunning(!isRunning);
          onUpdate({ ...task, isRunning: !isRunning });
        }}
      >
        {isRunning ? '⏸️' : '▶️'}
      </button>
    </div>
  );
}