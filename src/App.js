import React, { useState, useEffect } from 'react';
import './App.css'; // для стилей, можно создать файл

// --- Компонент статистики ---
const TaskStatistics = ({ tasks, filter, onFilterChange, onClearCompleted, saveStatus }) => {
  const total = tasks.length;
  const active = tasks.filter(task => !task.completed).length;
  const completed = tasks.filter(task => task.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-container">
      <p>Всего задач: {total}</p>
      <p>Активные: {active}</p>
      <p>Выполненные: {completed}</p>
      <p>Прогресс: {progress}%</p>

      <div className="filters">
        <button className={filter === 'all' ? 'active-filter' : ''} onClick={() => onFilterChange('all')}>Все</button>
        <button className={filter === 'active' ? 'active-filter' : ''} onClick={() => onFilterChange('active')}>Активные</button>
        <button className={filter === 'completed' ? 'active-filter' : ''} onClick={() => onFilterChange('completed')}>Выполненные</button>
      </div>

      <button className="clear-button" onClick={onClearCompleted}>Очистить выполненные</button>

      {saveStatus && <p className="save-status">{saveStatus}</p>}
    </div>
  );
};

// --- Главный компонент ---
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [filter, setFilter] = useState('all');

  // --- Загрузка задач из localStorage ---
  const loadTasksFromStorage = () => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      alert('Ошибка при загрузке задач');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Сохранение задач в localStorage ---
  const saveTasksToStorage = (tasksToSave) => {
    try {
      setSaveStatus('Сохраняем...');
      localStorage.setItem('tasks', JSON.stringify(tasksToSave));
      setSaveStatus('Сохранено');
      setTimeout(() => setSaveStatus(''), 1000);
    } catch (error) {
      setSaveStatus('Ошибка при сохранении');
    }
  };

  // --- useEffect для загрузки данных при монтировании ---
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // --- useEffect для автоматического сохранения при изменении задач ---
  useEffect(() => {
    if (!isLoading) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoading]);

  // --- Добавление новой задачи ---
  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
    setNewTask('');
  };

  // --- Очистка выполненных задач ---
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // --- Переключение выполнения задачи ---
  const toggleTaskCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // --- Фильтрация задач ---
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Загрузка задач...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Медицинское приложение: задачи</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Введите новую задачу"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            onClick={() => toggleTaskCompleted(task.id)}
            className={task.completed ? 'completed-task' : ''}
          >
            {task.text}
          </li>
        ))}
      </ul>

      <TaskStatistics
        tasks={tasks}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        saveStatus={saveStatus}
      />
    </div>
  );
};

export default App;