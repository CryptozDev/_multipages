import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons
import '../Todo.css';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortStatus, setSortStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  // Fetch dummy data from JSONPlaceholder
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = { id: tasks.length + 1, title: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const handleToggleStatus = (taskId) => {
    const newTasks = tasks.map((task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortStatus(e.target.value);
  };

  // Filter tasks based on search input and status
  const filteredTasks = tasks
    .filter(task => {
      const searchText = searchInput.toLowerCase();
      return task.title.toLowerCase().includes(searchText) || 
             task.id.toString().includes(searchText);  // ค้นหาได้ทั้ง ID และ Title
    })
    .filter(task => sortStatus === 'all' ? true : (sortStatus === 'done' ? task.completed : !task.completed));

  // Handle pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleItemsPerPageChange = (e) => {
    setTasksPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="Head">
      <header className="header">
        <h1>Todo List</h1>
      </header>

      <div className="todo-app">
        {/* Add Task Input and Button */}
        <div className="task-controls">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <hr className="custom-hr" />
        {/* Search Task */}
        <div className="search-and-filter">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search tasks by ID or title"
          />
        </div>

        {/* Select Filter for Task Status */}
        <div className="select-controls">
          <select value={sortStatus} onChange={handleSortChange}>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="waiting">Waiting</option>
          </select>

          {/* Select for Items per Page */}
          <select value={tasksPerPage} onChange={handleItemsPerPageChange}>
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>{num} items per page</option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>
                  <button
                    className={task.completed ? 'status-btn done' : 'status-btn waiting'}
                    onClick={() => handleToggleStatus(task.id)}
                  >
                    <i className={task.completed ? 'bi bi-check-circle-fill' : 'bi bi-hourglass-split'}></i>
                    {task.completed ? ' Done' : ' Waiting'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    <i className="bi bi-trash-fill"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>&laquo; Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next &raquo;</button>
          <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;