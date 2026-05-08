import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, LayoutDashboard, Clock, CheckCircle, Target, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Modals state
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            toast.error('Failed to load tasks');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Task Actions
    const handleOpenModal = (task = null) => {
        setEditingTask(task);
        setIsTaskModalOpen(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask.id}`, taskData);
                toast.success('Task updated successfully');
            } else {
                await api.post('/tasks', taskData);
                toast.success('New task created');
            }
            fetchTasks();
            setIsTaskModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save task');
        }
    };

    const handleConfirmDelete = (id) => {
        setTaskToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${taskToDelete}`);
            toast.success('Task deleted successfully');
            fetchTasks();
        } catch (error) {
            toast.error('Failed to delete task');
        } finally {
            setIsConfirmModalOpen(false);
            setTaskToDelete(null);
        }
    };

    const handleStatusToggle = async (task) => {
        const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
        try {
            await api.put(`/tasks/${task.id}`, { ...task, status: newStatus });
            toast.success(`Task marked as ${newStatus.toLowerCase()}`);
            fetchTasks();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    // Stats calculation
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
    const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED').length;

    return (
        <div className="dashboard-layout">
            <Sidebar user={user} />
            
            <div className="main-wrapper">
                <Navbar onLogout={handleLogout} />
                
                <main className="content-area">
                    {/* Header */}
                    <div className="dashboard-header">
                        <div>
                            <h2>Welcome back, {user?.name?.split(' ')[0]}!</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your projects today.</p>
                        </div>
                        <motion.button 
                            onClick={() => handleOpenModal()} 
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus size={20} />
                            New Task
                        </motion.button>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <StatCard title="Total Tasks" value={totalTasks} icon={Target} colorClass="badge-inprogress" />
                        <StatCard title="In Progress" value={pendingTasks} icon={Clock} colorClass="badge-pending" />
                        <StatCard title="Completed" value={completedTasks} icon={CheckCircle} colorClass="badge-completed" />
                    </div>

                    {/* Task Board */}
                    <div className="task-board">
                        <div className="task-header">
                            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LayoutDashboard size={20} color="var(--accent-cyan)" />
                                Your Board
                            </h3>
                        </div>

                        {isLoading ? (
                            <div className="empty-state">
                                <div className="empty-icon animate-pulse" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
                                    <Clock size={32} />
                                </div>
                                <h3>Loading tasks...</h3>
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="empty-state glass-panel">
                                <div className="empty-icon">
                                    <Inbox size={48} />
                                </div>
                                <h3>No tasks found</h3>
                                <p>You haven't created any tasks yet. Start organizing your work by creating a new task.</p>
                                <button onClick={() => handleOpenModal()} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                                    <Plus size={18} /> Create your first task
                                </button>
                            </div>
                        ) : (
                            <motion.div layout className="task-grid">
                                <AnimatePresence>
                                    {tasks.map((task, index) => (
                                        <TaskCard 
                                            key={task.id} 
                                            task={task} 
                                            index={index}
                                            onToggleStatus={handleStatusToggle}
                                            onEdit={handleOpenModal}
                                            onDelete={handleConfirmDelete}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modals */}
            <TaskModal 
                isOpen={isTaskModalOpen} 
                onClose={() => setIsTaskModalOpen(false)} 
                onSave={handleSaveTask}
                task={editingTask}
            />
            
            <ConfirmModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
            />
        </div>
    );
};

export default Dashboard;
